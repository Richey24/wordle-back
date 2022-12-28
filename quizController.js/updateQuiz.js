const { Quiz } = require("../schema")

const updateQuiz = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        const quiz = await Quiz.findById(id)
        if (!quiz) {
            return res.status(404).json({ message: "No quiz found with this ID" })
        }
        const theQuiz = await Quiz.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json(theQuiz)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateQuiz