const { Deck } = require("../schema")

const getAllDeck = async (req, res) => {
    try {
        const deck = await Deck.find({})
        res.status(200).json(deck)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllDeck