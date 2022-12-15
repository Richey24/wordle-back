const Sword = require("../schema")

const createSword = async (req, res) => {
    try {
        const body = req.body
        if (!body.topic) {
            return res.status(400).json({ message: "A topic is required" })
        }
        const sword = await Sword.create(body)
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = createSword