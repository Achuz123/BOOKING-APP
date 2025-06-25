const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // before split Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wZjYyNDQ0ZmE4OSIsImlhdCI6MTc1MDM0MTY3NSwiZXhwIjoxNzUwNDI4MDc1fQ"
    let token = req.headers.authorization.split(" ")[1]; // you split to remove the bearer token.Bearer token is basicaly the JWT token
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    //console.log(verifiedToken); //{ useId: '685161b54aad00f62444fa89', iat: 1750341675, exp: 1750428075 }
    req.userId = verifiedToken.userId;

    next(); //tells to give back control to the router
  } catch (error) {
    res.send({
      success: false,
      message: "Token not verified",
    });
  }
};
