const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
    {
        name: { type: String, required: true },
        writer: { type: String, required: true },
        ingredients: { type: [String], required: true },
        instructions: { type: [String], required: true },
        imgName: { type: String, required: true },
        categories: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('recipes', Recipe)