const {Schema, model} = require("mongoose");

const movieSchema = new Schema (
    {
        name:{type:String,required:true},
        actors:[{type:String}], 
        directors:[{type:String}],
        languages:[{type:String}],
        poster_url:[{type:String}],
    },
    {
        versionKey:false,
        timestamps:true
    })

const Movie = model("movie", movieSchema);
module.exports = Movie;