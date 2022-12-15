const Sword = require("../schema")

const deleteSword = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        await Sword.findByIdAndDelete(id)
        res.status(200).json({ message: "deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = deleteSword