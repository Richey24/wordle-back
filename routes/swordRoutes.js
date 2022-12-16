const express = require("express")
const createSword = require("../swordController/create")
const deleteSword = require("../swordController/delete")
const getAllSword = require("../swordController/getAll")
const getOneSword = require("../swordController/getOne")
const updateSword = require("../swordController/update")

const swordRoutes = express.Router()

swordRoutes.get("/get/all/:userId", getAllSword)
swordRoutes.get("/get/one/:id", getOneSword)
swordRoutes.post("/create", createSword)
swordRoutes.put("/update/:id", updateSword)
swordRoutes.delete("/delete/:id", deleteSword)

module.exports = swordRoutes