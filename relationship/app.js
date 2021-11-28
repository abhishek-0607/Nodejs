const express = require("express");
const mongoose = require("mongoose")

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
} 

//section

const sectionSchema = new mongoose.Schema(
    {
        section_no:{ type: Number, required: true, unique: true }
    },
    {
        versionKey:false,
        timestamps: true
    }
)

const Section = mongoose.model("section", sectionSchema);

//Author Schema

const authorSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, unique: true},
        last_name: { type: String, required: true }      
    },
    {
        versionKey:false,
        timestamps: true
    }
);

const Author = mongoose.model("author",authorSchema);

//Book Schema
const bookSchema = new mongoose.Schema(
    {
        book_title: { type: String, required: true , unique: true},
        author_ids:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            require: true,
        }],
        section_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: false
        }
        
    },
    {
        versionKey:false,
        timestamps: true
    }
);

const Book = mongoose.model("book",bookSchema);


const app = express();
app.use(express.json());

// CRUD for Sections

app.post("/sections",async (req,res)=>{
    try{
        const section = await Section.create(req.body);

       return res.status(201).send(section);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

app.get("/sections",async (req,res)=>{
    try{
        const sections = await Section.find().lean().exec()
       return res.send({sections});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

app.get("/sections/:id", async (req,res)=>{
    try{
        const section = await Section.findById(req.params.id).lean().exec();
       return res.send(section);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.patch("/sections/:id",async (req,res)=>{
    try{
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec();
        return res.status(201).send(section);
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.delete("/sections/:id",async (req,res)=>{
    try{
        const section = await Section.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(section);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})


// CRUD for Books

app.post("/books",async (req,res)=>{
    try{
        const book = await Book.create(req.body);

       return res.status(201).send(book);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

app.get("/books",async (req,res)=>{
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

app.get("/books/:id", async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id).lean().exec();
       return res.send(book);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.patch("/books/:id",async (req,res)=>{
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
app.delete("/books/:id",async (req,res)=>{
    try{
        const book = await Book.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(book);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})



// CRUD for authors

app.post("/authors",async (req,res)=>{
    try{
        const author = await Author.create(req.body);

       return res.status(201).send(author);
    }
    catch(e){
       return res.status(500).json({ message:e.message, status:"failed" })
    }

})

app.get("/authors",async (req,res)=>{
    try{
        const authors = await Author.find().lean().exec()
       return res.send({authors});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

app.get("/authors/:id", async (req,res)=>{
    try{
        const author = await Author.findById(req.params.id).lean().exec();
       return res.send(author);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.patch("/authors/:id",async (req,res)=>{
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
app.delete("/authors/:id",async (req,res)=>{
    try{
        const author = await Author.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(author);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})

app.get("/authors/:id/books",async (req,res)=>{
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





app.listen(8823, async function(){
    await connect();
    console.log("Listening to PORT 8823");
})




