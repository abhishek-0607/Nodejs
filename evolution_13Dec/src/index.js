const express = require("express");

const userController = require("./controllers/user_controller");

const movieController = require("./controllers/movie_controller");




const app = express();
app.use(express.json());

app.use("/users",userController)
app.use("/movies",movieController)


module.exports = app;