const express = require("express")
const { Word } = require("../schema")

const wordRoutes = express.Router()

wordRoutes.get("/get/all", async (req, res) => {
    
    const response = []

    const word = await Word.find({})
     .where('count').lte(1000)
     .sort({ field: 'asc', word: 1 });

    word.forEach((values,keys)=>{
        response.push(values.word.toLowerCase())
    });

    res.status(200).json(response)
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