const express = require('express');
const addHebrew = require('../hebrewController/addHebrew');
const deleteHebrew = require('../hebrewController/deleteHebrew');
const getAllHebrew = require('../hebrewController/getAllHebrew');
const getOneHebrew = require('../hebrewController/getOneHebrew');
const updateHebrew = require('../hebrewController/updateHebrew');
const multer = require('multer');
const getByDeck = require('../hebrewController/getByDeck');
const upload = multer({dest: "./upload"})
const hebrewRoutes = express.Router();

// const restrict = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         await promisify(jwt.verify)(token, "rich")
//         next()
//     } catch (error) {
//         return res.status(401).json({ message: "invalid token" })
//     }
// }

hebrewRoutes.post("/create", upload.single("hebrew"), addHebrew)
hebrewRoutes.get("/get/all", getAllHebrew)
hebrewRoutes.get("/get/deck/:deck", getByDeck)
hebrewRoutes.get("/get/one/:id", getOneHebrew)
hebrewRoutes.put("/update/:id", updateHebrew)
hebrewRoutes.delete("/delete/:id", deleteHebrew)

module.exports = hebrewRoutes