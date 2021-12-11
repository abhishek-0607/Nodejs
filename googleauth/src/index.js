const express = require("express");

const {register,login} = require("./controllers/auth_controller")
const productController = require("./controllers/product_controller")


const app = express();

app.use(express.json());

app.post("/register",register);
app.post("/login",login)

app.use("/products" , productController)




module.exports = app;