const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("✅ Verified Token Payload:", decoded);

    req.userId = decoded.userId; // ✅ Assign directly to req.userId
    next();
  } catch (error) {
    console.log("❌ JWT Middleware Error:", error.message);
    res.status(401).send({
      success: false,
      message: "Token not verified",
    });
  }
};

/*const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    console.log(verifiedToken);

    req.body.userId = verifiedToken.userId;

    next();
  } catch (error) {
    console.log("⚠️ Middleware Error Occurred:");
    console.log("Authorization Header:", req.headers.authorization);
    console.log(
      "Token (after split):",
      req.headers.authorization?.split(" ")[1]
    );

    console.log("Error:", error.message); // or just error
    return res.send({
      success: false,
      message: "Token not verified",
    });
  }
};*/
