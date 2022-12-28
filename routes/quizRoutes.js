const express = require("express")
const createQuiz = require("../quizController.js/createQuiz")
const deleteQuiz = require("../quizController.js/deleteQuiz")
const getAllQuiz = require("../quizController.js/getAllQuiz")
const getOneQuiz = require("../quizController.js/getOneQuiz")
const updateQuiz = require("../quizController.js/updateQuiz")

const quizRoutes = express.Router()

quizRoutes.post("/create", createQuiz)
quizRoutes.get("/get/all", getAllQuiz)
quizRoutes.get("/get/one/:id", getOneQuiz)
quizRoutes.put("/update/:id", updateQuiz)
quizRoutes.delete("delete/:id", deleteQuiz)

module.exports = quizRoutes