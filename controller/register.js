const { User } = require("../schema")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const confirmMail = require("../confirm")

const register = async (req, res) => {
    try {
        const body = req.body
        if (!body.username || !body.password || !body.name || !body.email) {
            return res.status(400).json({ message: "Send all required information" })
        }
        const check = await User.findOne({ email: body.email })
        if (check) {
            return res.status(419).json({ message: "This email is already registered" })
        }
        const unique = await User.findOne({ username: body.username })
        if (unique) {
            return res.status(203).json({ message: "Username already taken" })
        }
        const pass = await argon2.hash(body.password)
        body.password = pass
        body.createdAt = new Date()
        const user = await User.create(body)
        const token = jwt.sign({ id: user._id }, "rich", { expiresIn: "10h" })
        const mainUser = await User.findByIdAndUpdate(user._id, { mainToken: token }, { new: true }).select("-password")
        await confirmMail(user.email, user._id, user.name)
        res.status(200).json(mainUser)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = register
