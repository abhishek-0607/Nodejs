const {Schema,model}= require("mongoose");
const postSchema = new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        require:true
    }

},{
    versionKey:false,
    timestamps:true
})

const Post = model("post",postSchema);
module.exports = Post;