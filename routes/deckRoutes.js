const express = require('express');
const addDeck = require('../deckController/addDeck');
const deleteDeck = require('../deckController/deleteDeck');
const getAllDeck = require('../deckController/getAllDeck');
const deckRoutes = express.Router()

// const restrict = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         await promisify(jwt.verify)(token, "rich")
//         next()
//     } catch (error) {
//         return res.status(401).json({ message: "invalid token" })
//     }
// }

deckRoutes.post("/create", addDeck)
deckRoutes.get("/get/all", getAllDeck)
deckRoutes.delete("/delete/:id", deleteDeck)

module.exports = deckRoutes