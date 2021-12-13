const express = require("express");

const Movie = require("../models/movie");

//const authenticate = require("../middlewares/authenticate")

const router = express.Router();

router.post("/",async (req,res)=>{
    try{

        //const user = req.user
        const movie = await Movie.create(req.body);
        return res.status(201).send({movie})
    }
    catch(e){
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})

module.exports = router;