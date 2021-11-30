const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
} 

module.exports = connect;