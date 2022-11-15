const express = require("express")
const deleteUser = require("../controller/deleteUser")
const getOne = require("../controller/getOne")
const login = require("../controller/login")
const register = require("../controller/register")
const updateUser = require("../controller/update")
const User = require("../schema")

const userRoute = express.Router()

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.get("/get/:id", getOne)
userRoute.put("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)
userRoute.get("/find/all", async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
})

module.exports = userRoute