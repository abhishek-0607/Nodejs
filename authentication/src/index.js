const express = require("express");

const {register,login} = require("./controllers/auth_controller")

const postController = require("./controllers/post_controller")

const app = express();

app.use(express.json());

app.post("/register",register);
app.post("/login",login)

app.use("/posts",postController)



module.exports = app;