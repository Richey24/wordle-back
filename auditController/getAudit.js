const { Audit } = require("../schema")

const getAudit = async (req, res) => {
    try {
        const audit = await Audit.find({})
        res.status(200).json(audit)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAudit