const express = require("express");

const Theatre = require("../models/theatre");

const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const theatre = await Theatre.create(req.body);
        return res.status(201).send(theatre)
    }
    catch{
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})

module.exports = router;