const express = require("express");
const router = express.Router();
const User = require("../Models/userModel.js");
const send = require("send");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//ROUTE FOR REGISTER

router.post("/register", async (req, res) => {
  //To handle if user is aldready registered
  try {
    const userExist = await User.findOne({ email: req.body.email }); //checking in email for one matchin value of the email from the body
    if (userExist) {
      return res.send({
        success: false,
        message: "User Exist",
      });
    }

    //adding the user if not exisit if res.send is executed then the below code is ommitted

    // encryting the password
    const salt = await bcrypt.genSalt(10); //10 is the number of rounds
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;

    //saving the info in DB
    const newUser = await User(req.body);
    await newUser.save();

    //sending message if sucessfull
    res.send({
      success: true,
      message: "User Registered Sucessfully",
    });
  } catch (error) {}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//route for login

router.post("/login", async (req, res) => {
  try {
    // To check if the user exists

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        success: false,
        message: "Not Registered",
      });
    }

    //Compare Password

    const validatepass = await bcrypt.compare(req.body.password, user.password); // first plain text then second has password

    //sending messages based on true and false

    if (validatepass) {
      //ASSIGNNING THE JWT TOKEN
      // you pass the userid that mongodb generates then the unique signature then the expiration

      const token = jwt.sign({ useId: user._id }, `${process.env.SECRET_KEY}`, {
        expiresIn: "1d",
      });

      res.send({
        success: true,
        message: "User Logged In",
        token: token,
      });
    } else {
      res.send({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch (error) {}
});
module.exports = router;
