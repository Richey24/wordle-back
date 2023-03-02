const express = require('express');
const addHebrew = require('../hebrewController/addHebrew');
const deleteHebrew = require('../hebrewController/deleteHebrew');
const getAllHebrew = require('../hebrewController/getAllHebrew');
const getOneHebrew = require('../hebrewController/getOneHebrew');
const updateHebrew = require('../hebrewController/updateHebrew');
const multer = require('multer');
const getByDeck = require('../hebrewController/getByDeck');
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

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

hebrewRoutes.post("/create", restrict, upload.single("hebrew"), addHebrew)
hebrewRoutes.get("/get/all", restrict, getAllHebrew)
hebrewRoutes.get("/get/deck/:deck", restrict, getByDeck)
hebrewRoutes.get("/get/one/:id", restrict, getOneHebrew)
hebrewRoutes.put("/update/:id", restrict, updateHebrew)
hebrewRoutes.delete("/delete/:id", restrict, deleteHebrew)

module.exports = hebrewRoutes