const { Deck } = require("../schema")

const deleteDeck = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        await Deck.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = deleteDeck