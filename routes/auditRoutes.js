const express = require("express")
const addAudit = require("../auditController/addAudit")
const getAudit = require("../auditController/getAudit")

const auditRoutes = express.Router()

auditRoutes.get("/get/all", getAudit)
auditRoutes.post("/add", addAudit)

module.exports = auditRoutes