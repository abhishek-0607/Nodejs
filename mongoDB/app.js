const express = require("express");
const mongoose = require("mongoose");

//const movies = require("./movies.json");
/* 
    1 connect to mongodb server
    2 create schema
    3 create a model
*/
const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
}

const movieSchema = new mongoose.Schema({
    movie_name:{type: String, required:true, unique:true},
    movie_genre:{type: String, required:false},
    production_year:{type: Number, required:true},
    budget:{type:String, required:false},
},{
    versionKey:false,
    timestamps:true
})
const Movie = mongoose.model("movie",movieSchema); //movies


const app = express();
app.use(express.json());

/*
users
post = /users
get all = /users
get one = /users/:id
update one = /users/:id
delete one = /users/:id
*/

app.post("/movies",async (req,res)=>{
    try{
        const movie = await Movie.create(req.body);

       return res.status(201).send(movie);
    }
    catch(e){
       return res.status(500).json({ message:e.message,status:"failed" })
    }

})

app.get("/movies",async (req,res)=>{
    try{
        const movies = await Movie.find().lean().exec()
       return res.send({movies});
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })
    }

})

app.get("/movies/:id", async (req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id).lean().exec();
       return res.send(movie);
    }catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.patch("/movies/:id",async (req,res)=>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        return res.status(201).send(movie);
    }
    catch(e){
       return res.status(500).json({ message: e.message, status:"failed" })

    }
});
app.delete("/movies/:id",async (req,res)=>{
    try{
        const movie = await Movie.findOneAndDelete(req.params.id).lean().exec();
        return res.status(200).send(movie);
    }
    catch(e){
        return res.status(500).json({ message: e.message, status:"failed" })

    }   
})

app.listen(8823, async function(){
    await connect();
    console.log("Listening to PORT 8823");
})