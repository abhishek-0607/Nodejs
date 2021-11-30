const express = require("express");

const User = require("../models/user.js");

const router = express.Router();

router.post("/",async(req,res)=>{
    try{
       const users = await User.create(req.body);
       return res.status(201).send(users);
    }
    catch(e){
        return res.status(500).json({status:"Failed", message:e.message})
    }
})
 router.get("/",async(req,res)=>{
     try{
        const users = await User.find().lean().exec()
        return res.send(users);
     }
     catch(e){
         return res.status(500).json({status:"Failed", message:e.message})
     }
 })
 module.exports = router;