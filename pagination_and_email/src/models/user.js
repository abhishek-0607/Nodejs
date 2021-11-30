const {Schema,model}= require("mongoose");

const userSchema = new Schema({
   first_name:{ type:String, required:true, unique:true },
   last_name:{ type:String },
   email:{ type:String, required:true }
})
 const User = model("user", userSchema)
module.exports = User;