const { Quiz } = require("../schema")

const getOneQuiz = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(404).json({ message: "No quiz found with this ID" })
        }
        res.status(200).json(quiz)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getOneQuiz