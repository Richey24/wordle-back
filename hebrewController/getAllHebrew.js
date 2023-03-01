const { Hebrew } = require("../schema")

const getAllHebrew = async (req, res) => {
    try {
        const hebrew = await Hebrew.find({})
        res.status(200).json(hebrew)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllHebrew