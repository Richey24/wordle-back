const express = require("express")
const login = require("../controller/login")
const register = require("../controller/register")
const User = require("../schema")

const userRoute = express.Router()

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.get("/get/all", async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
})

module.exports = userRoute