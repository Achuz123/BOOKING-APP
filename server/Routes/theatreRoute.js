const router = require("express").Router();
const Theatre = require("../Models/theatreModel");

//TO ADD A THEATRE

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();

    res.send({
      success: true,
      message: "THEATRE REGISTERED SUCESSFULLY",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router; //also mention in index.js

///////////////////////////////////////////////////////////////////////////////////////////////
// to update

router.put("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    // console.log(req.body.theatreId)
    res.send({
      success: true,
      message: "Theatre has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////
// to delete

router.put("/delete-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "The theatre has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
