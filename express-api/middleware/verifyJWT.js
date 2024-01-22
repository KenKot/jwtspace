const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("verifyJWT's error fired");
    console.log(authHeader);

    return res.status(401).json({ message: "Unauthorized!" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    console.log("verifyJWT fired");
    console.log("decoded.UserInfo.roles", decoded.UserInfo.roles);

    req.user = decoded.UserInfo.userId;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
