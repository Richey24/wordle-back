const { Sword } = require("../schema")

const getAllSwordByUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const sword = await Sword.find({ userId: userId })
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllSwordByUser