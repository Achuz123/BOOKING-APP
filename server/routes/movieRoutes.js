const Movie = require("../models/movieModel");
const router = require("express").Router();

// Add , Update , Delete and Get Movies

// Add Movie
router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Fetch the details of all the movies
router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Fetch single movie by id
router.post("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Update a movie
router.put("/update-movie", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "The movie has been updated!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Delete a movie
router.put("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);

    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
