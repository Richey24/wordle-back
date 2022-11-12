const User = require("../schema")
const argon2 = require("argon2")

const login = async (req, res) => {
    try {
        const body = req.body
        if (!body.email || !body.password) {
            return res.status(400).json({ message: "Username and password are required" })
        }
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(404).json({ message: "No user found with this email" })
        }
        const pass = await argon2.verify(user.password, body.password)
        if (!pass) {
            return res.status(401).json({ message: "Incorrect password" })
        }
        const { password, ...mainUser } = user._doc;
        res.status(200).json(mainUser)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = login