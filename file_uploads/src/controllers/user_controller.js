const express = require("express");

const User = require("../models/user");
const upload = require("../middleware/upload")

const router = express.Router();

router.post("/",upload.single("profile_pic"),async(req,res)=>{
    //console.log(path.join(__dirname,"../uploads"))
    try{
       const user = await User.create({
           first_name:req.body.first_name,
           last_name:req.body.last_name,
           profile_pic:req.file.path
       });

       return res.status(201).send({user});
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