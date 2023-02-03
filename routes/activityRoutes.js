const express = require('express');
const activityController = require('../controller/activityController');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const router = express.Router();

const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await promisify(jwt.verify)(token, "rich")
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

router.post('/gameActivity', activityController.createActivity);

module.exports = router;