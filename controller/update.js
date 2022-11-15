const User = require("../schema")

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" })
        }
        body.updatedAt = new Date()
        const mainUser = await User.findByIdAndUpdate(id, body, { new: true }).select("-password")
        res.status(200).json(mainUser)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateUser