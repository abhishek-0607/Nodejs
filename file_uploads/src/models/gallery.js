const {Schema, model} = require("mongoose");

const gallerySchema = new Schema({
    pictures:[{
        type:String,
        required:true
    }],
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

const Gallery = model("gallery", gallerySchema);
module.exports = Gallery;