const express = require("express");

const Product = require("../models/product")

const authenticate = require("../middlewares/authenticate");

const router = express.Router();


router.post("/",authenticate,async (req,res)=>{
    try{
        const user = req.user;
        //console.log(user)


        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            user: user.user._id
        });

       return res.status(201).send(product);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})


router.get("/",async (req,res)=>{
    try{
        const products = await Product.find().lean().exec()
       return res.send({products});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

router.get("/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id).lean().exec();
       return res.send(product);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});

module.exports = router;
