const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const theatreRoute = require("./routes/theatreRoute.js");
const movieRoutes = require("./routes/movieRoutes.js");
const showRoutes = require("./routes/showRoutes.js");
const bookingRoute = require("./routes/bookingRoute.js");
const app = express();
const cors = require("cors");

//DB CONNECTION CODE
app.use(
  cors({
    origin: "https://screeenly.netlify.app",
    credentials: true,
  })
);
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
app.use("/api/bookings", bookingRoute);

//Server code
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`SERVER STARTED on ${PORT}`);
});
