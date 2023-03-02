const { Deck } = require("../schema")

const addDeck = async (req, res) => {
    try {
        const body = req.body
        await Deck.create(body)
        res.status(200).json({ message: "Deck created" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = addDeck