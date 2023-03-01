const { Hebrew } = require("../schema")

const getOneHebrew = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        const hebrew = Hebrew.findById(id)
        res.status(200).json(hebrew)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getOneHebrew