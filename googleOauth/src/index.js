const express = require("express");

const {register,login} = require("./controllers/auth_controller")

const productController = require("./controllers/product_controller")

const passport = require("./configs/passport")


const app = express();

app.use(express.json());

app.use(passport.initialize());

passport.serializeUser(function({user,token},done){
    //console.log("user:",user);
    done(null,{user,token})
})

passport.deserializeUser(function(user,done){
    // console.log("user2:",user);
    done(err,user)
})

app.post("/register",register);
app.post("/login",login)

app.use("/products" , productController)

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),
    function (req,res){
        console.log("req:", req.user);
        res.status(201).json({user: req.user.user,token: req.user.token})
    }
);

app.get("/auth/google/failure",function(req,res){
    return res.send("something went wrong");
})




module.exports = app;