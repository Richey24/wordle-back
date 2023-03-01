const sendMail = require("../mail/mailer")
const { User } = require("../schema")
const jwt = require("jsonwebtoken")

const getWithEmail = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "User email is required" })
    }
    const user = await User.findOne({ email: email }).select("-password")
    if (!user) {
        return res.status(404).json({ message: "No user found with this ID" })
    }
    const token = jwt.sign({ id: user._id }, "rich", { expiresIn: "10h" })
    await sendMail(user.email, token, user.firstName)
    res.status(200).json(user)


}

module.exports = getWithEmail