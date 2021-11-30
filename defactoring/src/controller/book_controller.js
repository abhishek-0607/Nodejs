const express = require("express")
const Book = require("../models/book");

const router = express.Router();


// CRUD for Books

router.post("",async (req,res)=>{
    try{
        const book = await Book.create(req.body);

       return res.status(201).send(book);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

router.get("",async (req,res)=>{
    try{
        const books = await Book.find()
        .populate({path:"section_id",select:"section_no"})
        .populate({path:"author_ids",select:"first_name"}).lean().exec()
       return res.send({books});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

router.get("/:id", async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id).lean().exec();
       return res.send(book);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
router.patch("/:id",async (req,res)=>{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec();
        return res.status(201).send(book);
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
router.delete("/:id",async (req,res)=>{
    try{
        const book = await Book.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(book);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})

module.exports = router;