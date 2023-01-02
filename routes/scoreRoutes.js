const express = require("express")
const createQuizScore = require("../scoreController/createQuizScore")
const getAllQuizScore = require("../scoreController/getAllQuizScore")

const scoreRoutes = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

scoreRoutes.post("/create", restrict, createQuizScore)
scoreRoutes.get("/get/all", restrict, getAllQuizScore)

module.exports = scoreRoutes