const mongoose = require("mongoose")
//Book Schema
const bookSchema = new mongoose.Schema(
    {
        book_title: { type: String, required: true , unique: true},
        author_ids:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            require: true,
        }],
        section_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: false
        }       
    },
    {
        versionKey:false,
        timestamps: true
    }
);
const Book = mongoose.model("book",bookSchema);

module.exports = Book;