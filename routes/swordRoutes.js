const express = require("express")
const createSword = require("../swordController/create")
const deleteSword = require("../swordController/delete")
const getAll = require("../swordController/getAll")
const getAllByAdmin = require("../swordController/getAllByAdmin")
const getAllSwordByUser = require("../swordController/getAllByUser")
const getDel = require("../swordController/getDel")
const getOneSword = require("../swordController/getOne")
const updateSword = require("../swordController/update")

const swordRoutes = express.Router()

swordRoutes.get("/get/all", getAll)
swordRoutes.get("/get/all/admin", getAllByAdmin)
swordRoutes.get("/get/all/deleted/:value", getDel)
swordRoutes.get("/get/all/:userId", getAllSwordByUser)
swordRoutes.get("/get/one/:id", getOneSword)
swordRoutes.post("/create", createSword)
swordRoutes.put("/update/:id", updateSword)
swordRoutes.delete("/delete/:id", deleteSword)

module.exports = swordRoutes