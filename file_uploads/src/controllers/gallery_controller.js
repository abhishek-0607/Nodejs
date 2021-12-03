const express = require("express");

const Gallery = require("../models/gallery");
const upload = require("../middleware/upload")

const router = express.Router();

router.post("/multiple",upload.any("pictures"),async (req,res)=>{
    const filePaths = req.files.map((file) => file.path);
    try{
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            pictures: filePaths
        })
        return res.status(201).send({gallery});
    }
    catch(e){
        return res.status(500).json({status:"Failed", message:e.message})
    }
    

    
})

router.get("/",async (req,res)=>{
    try{
        const gallery = await Gallery.find()
        return res.status(201).send({gallery});
    }
    catch(e){
        return res.status(500).json({status:"Failed", message:e.message})
    }
    

    
})

module.exports = router;
