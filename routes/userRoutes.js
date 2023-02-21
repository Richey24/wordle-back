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
const confirmUser = require("../controller/confirm")
const userController = require('../controller/userController')
const auth = require("../utils/auth");
const cancelSub = require("../controller/cancelSub")
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
userRoute.post("cancel/sub/mail", cancelSub)

userRoute.delete("/delete/:id", restrict, deleteUser)
userRoute.post("/confirm/:id", confirmUser)
userRoute.get("/find/all", restrict, async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
})

userRoute.get('/me', auth, userController.getUserInformation)
userRoute.get('/gamedata', auth, userController.getUserGameData)
userRoute.get('/all', auth, userController.getAllUser)

module.exports = userRoute