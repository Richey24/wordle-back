const { Sword } = require("../schema")

const getAllByAdmin = async (req, res) => {
    try {
        const sword = await Sword.find({ admin: true })
        res.status(200).json(sword)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllByAdmin