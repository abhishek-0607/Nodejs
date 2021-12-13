const {Schema, model} = require("mongoose");

const screenSchema = new Schema (
    {
        name:{type:String,required:true},
        theatre:
        {
            type: Schema.Types.ObjectId,
            ref: "theatre",
            required: true
        }

    },
    {
        versionKey:false,
        timestamps:true
    })

const Screen = model("screen", screenSchema);
module.exports = Screen;