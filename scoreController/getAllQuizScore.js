const { Score } = require("../schema")

const getAllQuizScore = async (req, res) => {
    try {
        const score = await Score.find({})
        res.status(200).json(score)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllQuizScore