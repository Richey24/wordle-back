const express = require("express")
const createSword = require("../swordController/create")
const deleteSword = require("../swordController/delete")
const updateSword = require("../swordController/update")

const swordRoutes = express.Router()

swordRoutes.post("/create", createSword)
swordRoutes.put("/update/:id", updateSword)
swordRoutes.delete("/delete/:id", deleteSword)

module.exports = swordRoutes