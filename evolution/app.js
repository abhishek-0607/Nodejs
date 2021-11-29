
const express = require("express");
const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
}

const app = express();
app.use(express.json());

app.listen(8823,async function(){
    await connect();
    console.log("listening to PORT 8823")
})