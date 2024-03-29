const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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
    mainToken: {
        type: String
    },
    church: {
        type: String
    },
    country: {
        type: Array
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    tribe: {
        type: Array,
        required: false
    },
    admin: {
        type: Boolean
    },
    superAdmin: {
        type: Boolean
    },
    emailNotification: {
        type: Boolean,
        default: false
    },
    newsletter: {
        type: Boolean,
        default: false
    },
    expiryDate: {
        type: Date,
        default: new Date("04/01/2023")
    },
    paid: {
        type: Boolean,
        default: true
    },
    customerID: {
        type: String
    },
    subscriptionID: {
        type: String
    },
    plan: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    dailyWQS: {
        type: Number,
        require: false
    },
    dailyBQS: {
        type: Number,
        require: false
    },
    dailyHS: {
        type: Number,
        require: false
    },
    hebrewScore: {
        type: Number,
        require: false,
        default: 0
    },
    playedHang: {
        type: Boolean
    },
    playedTrivial: {
        type: Boolean
    },
    deckLevel: {
        type: Number,
        default: 1
    },
    sound: {
        type: Boolean,
        default: true
    },
    playedBible: {
        type: Boolean
    },
    playedHebrew: {
        type: Boolean
    },
    onlineStatus: {
        type: Boolean,
        default: false
    },
    playedCross: {
        type: Boolean
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
    toBeDeleted: {
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

const quizSchema = new mongoose.Schema({
    question: {
        type: String
    },
    answer: {
        type: Array
    },
    learnMore: {
        type: String
    },
    toBeDeleted: {
        type: Boolean
    }
})

const quizScoreSchema = new mongoose.Schema({

    playerName: {
        type: String
    },

    tribe: {
        type: String
    },

    score: {
        type: String
    },
})

const cartSchema = new mongoose.Schema({
    sessionID: {
        type: String
    },
    email: {
        type: String
    },
    plan: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userID: {
        type: String
    }
})

const hebrewSchema = new mongoose.Schema({
    paleoHebrewText: {
        type: String
    },
    english: {
        type: String
    },
    correctImage: {
        type: String
    },
    level: {
        type: String
    },
    deck: {
        type: String
    },
    toBeDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const deckSchema = new mongoose.Schema({
    color1: {
        type: String
    },
    color2: {
        type: String
    },
})

const logSchema = new mongoose.Schema({
    user: {
        type: Object
    },
    eventType: {
        type: String
    }
})

const User = mongoose.model("User", userSchema, 'user')
const Sword = mongoose.model("Sword", swordSchema, 'sword')
const Audit = mongoose.model("Audit", auditSchema, 'audit')
const Quiz = mongoose.model("Quiz", quizSchema, "quiz")
const Score = mongoose.model("Score", quizScoreSchema, "score")
const Cart = mongoose.model("Cart", cartSchema, "cart")
const Hebrew = mongoose.model("Hebrew", hebrewSchema, 'hebrew')
const Deck = mongoose.model("Deck", deckSchema, 'deck')
const Logger = mongoose.model("Logger", logSchema, 'logger')
const Word = mongoose.model(
    'words',
    new mongoose.Schema({
        word: String,
        count: Number
    })
);


module.exports = { User, Sword, Audit, Quiz, Score, Word, Cart, Hebrew, Deck, Logger }