require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", verifyToken, (req, res) => {
  // verifyToken added user info onto "req.user"

  res.json(req.user);
});

app.post("/login", (req, res) => {

  const user = {
    name: "bob",
    id: 1,
  };

  const message = req.body.message;

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  const token = bearerHeader && bearerHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    } else {
      req.user = decoded; // Attach the decoded token (which should include the user info) to the req object
      next();
    }
  });
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
