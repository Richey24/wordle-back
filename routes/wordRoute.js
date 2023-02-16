const express = require("express")
const { Word } = require("../schema")
const wordController = require("../controller/wordController")

const wordRoutes = express.Router()

wordRoutes.get("/get/all", wordController.getAllWords )

wordRoutes.get("/get/:id", async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "ID is required" })
    }
    const word = await Word.findById(id)
    res.status(200).json(word)
})


module.exports = wordRoutes