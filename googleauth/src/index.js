const express = require("express");

const {register,login} = require("./controllers/auth_controller")

const productController = require("./controllers/product_controller")

const passport = require("./configs/passport")


const app = express();

app.use(express.json());

app.post("/register",register);
app.post("/login",login)

app.use("/products" , productController)

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));




module.exports = app;