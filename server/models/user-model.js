const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: false },
        imgName: { type: String, required: false },
        favorites: { type: [String], required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)