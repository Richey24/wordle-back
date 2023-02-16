const express = require("express")
const addAudit = require("../auditController/addAudit")
const getAudit = require("../auditController/getAudit")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const deleteAudit = require("../auditController/deleteAudit")

const auditRoutes = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

auditRoutes.get("/get/all", restrict, getAudit)
auditRoutes.post("/add", restrict, addAudit)
auditRoutes.delete("/delete", restrict, deleteAudit)

module.exports = auditRoutes