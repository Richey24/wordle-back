const argon2 = require("argon2")
const { User } = require("../schema")

const changePassword = async (req, res) => {
    const body = req.body
    if (!body.oldPass || !body.newPass) {
        return res.status(400).json({ message: "Send all required information" })
    }
    const user = await User.findById(body.id)
    if (!user) {
        return res.status(400).json({ message: "No User found with this id" })
    }
    const verify = await argon2.verify(user.password, body.oldPass)
    if (!verify) {
        return res.status(401).json({ message: "Incorrect password" })
    }
    await User.findByIdAndUpdate(body.id, { password: body.newPass })
    res.status(200).json({ message: "password changed successfully" })
}

module.exports = changePassword