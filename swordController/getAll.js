const { Sword } = require("../schema")

const getAll = async (req, res) => {
    try {
        const sword = await Sword.find({})
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAll