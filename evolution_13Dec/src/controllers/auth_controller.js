require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const newToken = (user)=>{
    return jwt.sign.apply({user:user},process.env.JWT_ACCESS_KEY)
}


const register = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email}).lean().exec();
        if(user)
        return res.status(400).json({
            status:"Failed",
            message: "Please provide a different email address"
        })

        user = await User.create(req.body);

        const token = newToken(user);
        res.status(201).json({user,token});
    }
    catch(e){
        return res.status(400).json({
            status:"Failed",
            message: e.message
        })
    }
}

const login = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user)
        return res.status(400).json({
            status:"Failed",
            message: "please provide correct email & password"
        })

        const match = await user.checkPassword(req.body.password);

        if(!match)
        return res.status(400).json({
            status:"Failed",
            message: "please provide correct email & password"
        })

        const token = newToken(user);

        res.status(201).json({user,token});



    }
    catch(e){
        return res.status(400).json({
            status:"Failed",
            message: e.message
        })
    }
}
module.exports = {register,login}