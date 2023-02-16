const { Audit } = require("../schema")

const deleteAudit = async (req, res) => {
    try {
        await Audit.deleteMany({})
        res.status(200).json({ message: "audits deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = deleteAudit