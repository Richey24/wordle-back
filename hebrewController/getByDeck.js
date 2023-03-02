const { Hebrew } = require("../schema")

const getByDeck = async (req, res) => {
    try {
        const deck = req.params.deck
        if (!deck) {
            return res.status(400).json({ message: "ID is required" })
        }
        const hebrew = await Hebrew.find({ deck: deck })
        res.status(200).json(hebrew)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getByDeck