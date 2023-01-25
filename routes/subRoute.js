const express = require("express")
const subUser = require("../subscription/sub")

const subRoutes = express.Router()

subRoutes.post("/new", subUser)

module.exports = subRoutes