const User = require("../schema")


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const msg = await User.findByIdAndDelete(id)
        res.status(200).json(msg)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = deleteUser