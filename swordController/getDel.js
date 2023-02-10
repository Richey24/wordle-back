const { Sword } = require("../schema")

const getDel = async (req, res) => {
    try {
        const value = req.params.value
        if (!value) {
            return res.status(400).json({ message: "Value is required" })
        }
        const sword = await Sword.find({ toBeDeleted: value })
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getDel