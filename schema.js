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
    admin: {
        type: Boolean
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
    topic: {
        type: String
    },
    scripture: {
        type: Array
    },
    note: {
        type: String
    },
    userId: {
        type: String
    },
    admin: {
        type: Boolean
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedBy: {
        type: String
    },
    updatedAt: {
        type: Date
    },
})

const auditSchema = new mongoose.Schema({
    audit: {
        type: String
    }
})

const User = mongoose.model("User", userSchema, 'user')
const Sword = mongoose.model("Sword", swordSchema, 'sword')
const Audit = mongoose.model("Audit", auditSchema, 'audit')

module.exports = { User, Sword, Audit }