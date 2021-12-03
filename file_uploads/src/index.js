const express = require("express");

const userController = require("./controllers/user_controller")
const galleryController = require("./controllers/gallery_controller")



const app = express();

app.use(express.json());
app.use("/users",userController)
app.use("/galleries",galleryController);

module.exports = app;