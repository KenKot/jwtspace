const models = require("../models");
const User = models.User;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

// DESCRIPT: login
// ROUTE: POST /auth
// ACCESS: public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const foundUserRoles = await foundUser.fetchRoles();
  // const foundUserRoles = await foundUser.getRoles(); // getRoles() is a sequelize f(x)built in, but will include more data

  const accessToken = jwt.sign(
    {
      UserInfo: {
        userId: foundUser.id,
        roles: foundUserRoles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: foundUser.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    // secure: false, //http (use for Thunder client)
    secure: true, //https (use for browser)
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
});

// DESCRIPT: refresh
// ROUTE: GET /auth/refresh
// ACCESS: public
const refresh = asyncHandler(async (req, res) => {
  console.log("REFRESH RAN!!!");
  const cookies = req.cookies;
  console.log("cookies: ", cookies.jwt);
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const foundUserRoles = await foundUser.fetchRoles();

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUserRoles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ accessToken });
    })
  );
});

// DESCRIPT: logout
// ROUTE: GET /auth/logout
// ACCESS: public
const logout = asyncHandler(async (req, res) => {
  console.log("logout fired");
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
});

module.exports = { login, refresh, logout };
