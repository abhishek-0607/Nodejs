const {Schema, model} = require("mongoose");

const showSchema = new Schema (
    {
        timing:{type:String,required:true},
        movie_id:
        {
            type: Schema.Types.ObjectId,
            ref: "movie",
            required: true
        },
        total_seats:{type:Number,required:true},
        screen:
        {
            type: Schema.Types.ObjectId,
            ref: "screen",
            required: true
        }


    },
    {
        versionKey:false,
        timestamps:true
    })

const Show = model("show", showSchema);
module.exports = Show;