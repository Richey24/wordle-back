const { Audit } = require("../schema")

const addAudit = async (req, res) => {
    try {
        const body = req.body
        await Audit.create(body)
        res.status(200).json({ message: "successful" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = addAudit