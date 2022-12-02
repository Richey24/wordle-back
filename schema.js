const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tribe: {
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    wordQuestScore: {
        type: Number,
        require: false
    },
    bibleQuestScore: {
        type: Number,
        require: false
    },
    bibleGameScore: {
        type: Number,
        require: false
    },
    hangmanScore: {
        type: Number,
        require: false
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User