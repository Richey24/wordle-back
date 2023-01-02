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

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

swordRoutes.get("/get/all", restrict, getAll)
swordRoutes.get("/get/all/admin", restrict, getAllByAdmin)
swordRoutes.get("/get/all/deleted/:value", restrict, getDel)
swordRoutes.get("/get/all/:userId", restrict, getAllSwordByUser)
swordRoutes.get("/get/one/:id", restrict, getOneSword)
swordRoutes.post("/create", restrict, createSword)
swordRoutes.put("/update/:id", restrict, updateSword)
swordRoutes.delete("/delete/:id", restrict, deleteSword)

module.exports = swordRoutes