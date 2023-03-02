const express = require('express');
const addDeck = require('../deckController/addDeck');
const getAllDeck = require('../deckController/getAllDeck');
const deckRoutes = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

deckRoutes.post("/create", restrict, addDeck)
deckRoutes.get("/get/all", restrict, getAllDeck)

module.exports = deckRoutes