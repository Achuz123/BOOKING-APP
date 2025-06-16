const express = require("express");
const router = express.Router();
const User = require("../Models/userModel.js");

//ROUTE FOR REGISTER

router.post("/register", async (req, res) => {
  const newUser = await User(req.body);
  await newUser.save(); //saving the info in DB

  res.send({
    success: true,
    message: "user registered sucessfully",
  });
});

module.exports = router;
