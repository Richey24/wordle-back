const cancelMail = require("../mail/cancelMail")

const cancelSub = async (req, res) => {
    const { email, id, firstName } = req.body
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    cancelMail(email, id, firstName)
    res.status(200).json({ message: "Mail sent successfully" })

}

module.exports = cancelSub