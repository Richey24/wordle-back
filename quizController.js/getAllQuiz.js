const { Quiz } = require("../schema")

const getAllQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.find({})
        res.status(200).json(quiz)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllQuiz