const express = require("express")
const createQuiz = require("../quizController.js/createQuiz")
const deleteQuiz = require("../quizController.js/deleteQuiz")
const getAllQuiz = require("../quizController.js/getAllQuiz")
const getOneQuiz = require("../quizController.js/getOneQuiz")
const updateQuiz = require("../quizController.js/updateQuiz")

const quizRoutes = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

quizRoutes.post("/create", restrict, createQuiz)
quizRoutes.get("/get/all", restrict, getAllQuiz)
quizRoutes.get("/get/one/:id", restrict, getOneQuiz)
quizRoutes.put("/update/:id", restrict, updateQuiz)
quizRoutes.delete("/delete/:id", restrict, deleteQuiz)

module.exports = quizRoutes