const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB CONNECTION CODE

mongoose
  .connect(
    "mongodb+srv://achuthampi19:r1BueIze5bNjW60m@agri.6k18y.mongodb.net/?retryWrites=true&w=majority&appName=agri"
  )
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("ERROR IN DB CONNECTION");
  });

//middlewares
app.use(express.urlencoded);
app.use(express.json);

//Server code
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`SERVER STARTED on ${PORT}`);
});
