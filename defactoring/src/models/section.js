const mongoose = require("mongoose")


const sectionSchema = new mongoose.Schema(
    {
        section_no:{ type: Number, required: true, unique: true }
    },
    {
        versionKey:false,
        timestamps: true
    }
)

const Section = mongoose.model("section", sectionSchema);

module.exports = Section;