const express = require("express");

const Show = require("../models/show");

const Movie = require("../models/movie");

//const authenticate = require("../middlewares/authenticate")

const router = express.Router();

router.post("/",async (req,res)=>{
    try{

        //const user = req.user
        const show = await Show.create(req.body);
        return res.status(201).send({show})
    }
    catch(e){
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})
router.get("/:id/movies",async (req,res)=>{
    try{

        //const user = req.user
        const show = await Show.findById(req.params.id).lean().exec();
        const movie = await Movie.find({movie_id:movie._id}).populate({path:"movie_id",select:"name"}).lean().exec();
        return res.status(200).send({show,movie})
    }
    catch(e){
        return res.status(500).json({message:e.message, status :"Failed"})
    }
})

module.exports = router;