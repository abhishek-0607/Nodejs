const {Schema,model}= require("mongoose");

const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    roles:[{type:String, required:true}]
},{
    versionKey:false,
    timestamps:true
})
userSchema.pre("save", function (next){

    if(!this.isModified("password")) return next();

    //const hash = bcrypt.hashSync(this.password,10);
    bcrypt.hash(this.password,10,(res,hash)=>{
        this.password = hash;
        return next();
    })
    
})

userSchema.methods.checkPassword = function (password){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, this.password, function(err, same) {
            // res === true
            if(err){
                return reject(err);
            }
            resolve(same);
        })
    });
}

const User = model("user",userSchema);
module.exports = User;