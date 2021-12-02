const express = require("express");

const User = require("../models/user");
const sendMail = require("../utils/sendmail")

const router = express.Router();

router.post("/",async(req,res)=>{
    try{
       const users = await User.create(req.body);
       //console.log(users);
        sendMail("a@a.com",
        `${req.body.email}`,
        `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
        `Hi ${req.body.first_name}, Please confirm your email address`,
        `<h2>Hi ${req.body.first_name}, Please confirm your email address</h2>`);

       return res.status(201).send(users);
    }
    catch(e){
        return res.status(500).json({status:"Failed", message:e.message})
    }
})
router.get("/",async(req,res)=>{
     try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 5;
        const skip = (page -1)*size;

        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments())/size)

        return res.json({users, totalPages});
     }
     catch(e){
         return res.status(500).json({status:"Failed", message:e.message})
     }
})
 module.exports = router;