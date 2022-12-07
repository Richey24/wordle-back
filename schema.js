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
    },
    dailyWQS: {
        type: Number,
        require: false
    },
    dailyBQS: {
        type: Number,
        require: false
    },
    dailyBGS: {
        type: Number,
        require: false
    },
    dailyHS: {
        type: Number,
        require: false
    }
})

const swordSchema = new mongoose.Schema({
    searchText: {
        type: String
    },
    precepts: {
        type: String
    },
    note: {
        type: String
    },
    preceptsWithText: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdDate: {
        type: Date
    },
    LastUpdatedBy: {
        type: String
    },
    LastUpdatedDate: {
        type: Date
    },
})

const User = mongoose.model("User", userSchema)
const Sword = mongoose.model("Sword", swordSchema)

module.exports = User
module.exports = Sword