require("dotenv").config(); //will work in EVERY file!
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const path = require("path");

const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(logger);
app.use("/", express.static(path.join(__dirname, "public"))); // or app.use(express.static('public'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/users"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

const verifyRoles = require("./middleware/verifyRoles");
const verifyJWT = require("./middleware/verifyJWT");
// app.use("/test", verifyJWT, require("./routes/lounges"));
app.use("/test", require("./routes/lounges"));

// app.use(verifyJWT)  A nice way to use waterfalling to protect routes after

// for testing verifyJWT:
app.get("/hi", require("./middleware/verifyJWT"), (req, res) => {
  // app.get("/hi", (req, res) => {
  res.send({ message: "hello" });
});

// app.get("/", verifyToken, (req, res) => {
//   // verifyToken added user info onto "req.user"

//   res.json(req.user);
// });

// app.post("/login", (req, res) => {
//   const user = {
//     name: "bob",
//     id: 1,
//   };

//   const message = req.body.message;

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken });
// });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// HELPERS:
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   const token = bearerHeader && bearerHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: "Token is not valid" });
//     } else {
//       req.user = decoded; // Attach the decoded token (which should include the user info) to the req object
//       next();
//     }
//   });
// }
