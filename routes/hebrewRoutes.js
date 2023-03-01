const express = require('express');
const addHebrew = require('../hebrewController/addHebrew');
const deleteHebrew = require('../hebrewController/deleteHebrew');
const getAllHebrew = require('../hebrewController/getAllHebrew');
const getOneHebrew = require('../hebrewController/getOneHebrew');
const updateHebrew = require('../hebrewController/updateHebrew');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/")
    },
    filename: (req, file, callback) => {
        file.filename = `${Date.now()}correctImage.jpeg`
        callback(null, `${Date.now()}correctImage.jpeg`)
    }
})
const upload = multer({ storage: storage })
const hebrewRoutes = express.Router();

hebrewRoutes.post("/create", upload.single("hebrew"), addHebrew)
hebrewRoutes.get("/get/all", getAllHebrew)
hebrewRoutes.get("/get/one/:id", getOneHebrew)
hebrewRoutes.put("/update/:id", updateHebrew)
hebrewRoutes.delete("/delete/:id", deleteHebrew)

module.exports = hebrewRoutes