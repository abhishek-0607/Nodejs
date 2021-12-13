const express = require("express");

const {register,login} = require("./controllers/auth_controller")

//const userController = require("./controllers/user_controller");

const movieController = require("./controllers/movie_controller");

const theatreController = require("./controllers/theatre_controller");

const screenController = require("./controllers/screen_controller");





const app = express();
app.use(express.json());

app.post("/register", register);
app.post("/login", login);

//app.use("/users",userController)
app.use("/movies",movieController)
app.use("/theatres",theatreController)
app.use("/screens",screenController)



module.exports = app;