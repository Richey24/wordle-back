const express = require("express")
const { Word } = require("../schema")

const wordRoutes = express.Router()

wordRoutes.get("/get/all", async (req, res) => {
    const word = await Word.find({})
    res.status(200).json(word)
})

wordRoutes.get("/get/:id", async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "ID is required" })
    }
    const word = await Word.findById(id)
    res.status(200).json(word)
})


module.exports = wordRoutes