const { Sword } = require("../schema")

const updateSword = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const sword = await Sword.findById(id)
        if (!sword) {
            return res.status(404).json({ message: "No user found with this ID" })
        }
        body.updateAt = new Date()
        const theSword = await Sword.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json(theSword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateSword