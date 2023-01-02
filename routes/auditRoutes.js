const express = require("express")
const addAudit = require("../auditController/addAudit")
const getAudit = require("../auditController/getAudit")

const auditRoutes = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

auditRoutes.get("/get/all", restrict, getAudit)
auditRoutes.post("/add", restrict, addAudit)

module.exports = auditRoutes