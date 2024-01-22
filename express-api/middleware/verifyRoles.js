const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // console.log("verify roles fired");
    // next();
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    console.log("verify roles fired");

    //looking for a single "true"
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

// const verifyRoles = (req, res, next) => {
//   console.log("verify roles fired");
//   next();
// };

module.exports = verifyRoles;
