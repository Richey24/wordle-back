const User = require("../schema")
const argon2 = require("argon2")

const resetPassword = async (req, res) => {
    try {
        const id = req.params.id
        const password = req.body.password
        if (!id || !password) {
            return res.status(400).json({ message: "User ID and new password is required" })
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" })
        }
        const pass = await argon2.hash(password)
        const newPass = await User.findByIdAndUpdate(id, { password: password })
        res.status(200).json(newPass)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = resetPassword