const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute.js");
const theatreRoute = require("./Routes/theatreRoute.js");
const movieRoutes = require("./Routes/movieRoutes.js");
const showRoutes = require("./Routes/showRoutes.js");

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
app.use(express.urlencoded());
app.use(express.json());
//route
app.use("/api/users", userRoute);
app.use("/api/theatres", theatreRoute);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);

//Server code
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`SERVER STARTED on ${PORT}`);
});
