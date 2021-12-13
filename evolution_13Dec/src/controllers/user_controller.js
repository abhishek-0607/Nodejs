const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const user = await User.create(req.body);
        return res.status(201).send(user)
    }
    catch{
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})


module.exports = router;