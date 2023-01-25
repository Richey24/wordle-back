const express = require("express")
const deleteUser = require("../controller/deleteUser")
const getOne = require("../controller/getOne")
const getWithEmail = require("../controller/getWithEmail")
const login = require("../controller/login")
const register = require("../controller/register")
const resetPassword = require("../controller/resetPassword")
const updateUser = require("../controller/update")
const { User } = require("../schema")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")

const userRoute = express.Router()

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.get("/get/:id", restrict, getOne)
userRoute.post("/reset/send", getWithEmail)
userRoute.post("/reset/password/:id", resetPassword)
userRoute.put("/update/:id", restrict, updateUser)
userRoute.delete("/delete/:id", restrict, deleteUser)
userRoute.get("/find/all", restrict, async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
})

module.exports = userRoute