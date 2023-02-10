const { User } = require("../schema")

const confirmUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        await User.findByIdAndUpdate(id, { confirmed: true })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }

}

module.exports = confirmUser   