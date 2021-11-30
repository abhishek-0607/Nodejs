const express = require("express")
const Author = require("../models/author");
const Book = require("../models/book");


const router = express.Router();

// CRUD for authors

router.post("",async (req,res)=>{
    try{
        const author = await Author.create(req.body);

       return res.status(201).send(author);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

router.get("",async (req,res)=>{
    try{
        const authors = await Author.find().lean().exec()
       return res.send({authors});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

router.get("/:id", async (req,res)=>{
    try{
        const author = await Author.findById(req.params.id).lean().exec();
       return res.send(author);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
router.patch("/:id",async (req,res)=>{
    try{
        const author = await Author.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec();
        return res.status(201).send(author);
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
router.delete("/:id",async (req,res)=>{
    try{
        const author = await Author.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(author);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})

router.get("/:id/books",async (req,res)=>{
    try{
        const author = await Author.findById(req.params.id).lean().exec();
        const books = await Book.find({author_ids: author._id})
        .populate({path:"author_ids",select:"first_name"}).lean().exec();
        return res.status(200).send({books,author});
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }  
})

module.exports = router;