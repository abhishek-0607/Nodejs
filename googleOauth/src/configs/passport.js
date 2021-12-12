require("dotenv").config()

const passport = require("passport");

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const { uuid } = require("uuidv4");

const User = require("../models/user")

passport.use(
    new GoogleStrategy(
        {
            clientID:    process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:2244/auth/google/callback",
            userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
            passReqToCallback   : true
        },
        async function(request, accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile);

            let user = await User.findOne({email: profile?._json?.email}).lean().exec()

            if(!user){
                user = await User.create({
                    email: profile?._json?.email,
                     password: uuid() 
                    })
            }
            return done(null, user);
        }
));

module.exports = passport;