const express = require("express");

const userController = require("./controllers/user_controller");

const movieController = require("./controllers/movie_controller");

const theatreController = require("./controllers/theatre_controller");

const screenController = require("./controllers/screen_controller");





const app = express();
app.use(express.json());

app.use("/users",userController)
app.use("/movies",movieController)
app.use("/theatres",theatreController)
app.use("/screens",screenController)



module.exports = app;