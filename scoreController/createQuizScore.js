const { Score } = require("../schema")

const createQuizScore = async (req, res) => {
    try {
        const body = req.body
        if (!body.playerName) {
            return res.status(400).json({ message: "A player name is required" })
        }
        const score = await Score.create(body)
        res.status(200).json(score)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = createQuizScore