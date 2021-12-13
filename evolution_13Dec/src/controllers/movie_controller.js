const express = require("express");

const Movie = require("../models/movie");

const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const movie = await Movie.create(req.body);
        return res.status(201).send(movie)
    }
    catch{
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})

module.exports = router;