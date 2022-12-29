const express = require("express")
const createQuizScore = require("../scoreController/createQuizScore")
const getAllQuizScore = require("../scoreController/getAllQuizScore")

const scoreRoutes = express.Router()

scoreRoutes.post("/create", createQuizScore)
scoreRoutes.get("/get/all", getAllQuizScore)

module.exports = scoreRoutes