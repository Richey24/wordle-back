const { Quiz } = require("../schema")

const createQuiz = async (req, res) => {
    try {
        const body = req.body
        if (!body.question) {
            return res.status(400).json({ message: "A question is required" })
        }
        const quiz = await Quiz.create(body)
        res.status(200).json(quiz)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = createQuiz