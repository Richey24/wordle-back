const { Cart } = require("../schema")

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getCart