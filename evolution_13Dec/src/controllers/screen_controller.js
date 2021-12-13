const express = require("express");

const Screen = require("../models/screen");

const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const screen = await Screen.create(req.body);
        return res.status(201).send(screen)
    }
    catch{
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})

module.exports = router;