const { Hebrew } = require("../schema")

const updateHebrew = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        console.log(body);
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        await Hebrew.findByIdAndUpdate(id, body)
        res.status(200).json({ message: "Updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateHebrew