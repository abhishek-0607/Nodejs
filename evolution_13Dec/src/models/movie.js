const {Schema, model} = require("mongoose");

const movieSchema = new Schema (
    {
        name:{type:String,required:true},
        actors:[{type:String,required:true}], 
        directors:[{type:String,required:true}],
        languages:[{type:String,required:true}],
        poster_url:[{type:String,required:true}]
    },
    {
        versionKey:false,
        timestamps:true
    })

const Movie = model("movie", movieSchema);
module.exports = Movie;