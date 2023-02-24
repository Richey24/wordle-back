const cancelMail = require("../mail/cancelMail")

const cancelSub = async (req, res) => {
    try {
        const { email, id, firstName } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        await cancelMail(email, id, firstName)
        res.status(200).json({ message: "Mail sent successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = cancelSub