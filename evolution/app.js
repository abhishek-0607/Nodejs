
const express = require("express");
const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
}

// schema for jobs

const jobSchema = new mongoose.Schema({
    job_title:{type:String, required:true, unique:true},
    rating:{type:Number, required:true},


},{
    versionKey:false,
    timeStamps: true
})

const Job = mongoose.model("job",jobSchema);

//schema for city

const citySchema = new mongoose.Schema({
    city_name:{type:String, required:true, unique:true}
})



const app = express();
app.use(express.json());

app.listen(8823,async function(){
    await connect();
    console.log("listening to PORT 8823")
})