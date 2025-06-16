const express = require("express");
const router = express.Router();
const User = require("../Models/userModel.js");
const send = require("send");
const bcrypt = require("bcrypt");

//ROUTE FOR REGISTER

router.post("/register", async (req, res) => {
  //To handle if user is aldready registered

  try {
    const userExist = await User.findOne({ email: req.body.email }); //checking in email for one matchin value of the email from the body
    if (userExist) {
      res.send({
        success: false,
        message: "User aldready exist",
      });
    }

    //adding the user if not exisit if res.send is executed then the below code is ommitted

    // encryting the password
    const salt = await bcrypt.genSalt(10); //10 is the number of rounds
    hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;

    console.log(salt);
    const newUser = await User(req.body);
    await newUser.save(); //saving the info in DB
    //sending message if sucessfull
    res.send({
      success: true,
      message: "user registered sucessfully",
    });
  } catch (error) {}
});

module.exports = router;
