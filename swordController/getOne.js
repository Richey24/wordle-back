const Sword = require("../schema")

const getOneSword = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const sword = await Sword.findById(id)
        if (!sword) {
            return res.status(404).json({ message: "No sword found with this ID" })
        }
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getOneSword