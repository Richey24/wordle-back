const express = require("express")
const getCart = require("../subscription/getCart")

const subRoutes = express.Router()

subRoutes.get("/get", getCart)

module.exports = subRoutes