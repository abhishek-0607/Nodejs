const express = require("express");
const Post = require("../models/post");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();


router.post("/",authenticate,async (req,res)=>{
    try{
        const user = req.user;
        console.log(user)

        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user: user.user._id,
        });

       return res.status(201).send(post);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

router.get("/",async (req,res)=>{
    try{
        const posts = await Post.find().lean().exec()
       return res.send({posts});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id).lean().exec();
       return res.send(post);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});

module.exports = router;

