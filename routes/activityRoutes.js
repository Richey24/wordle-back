const express = require('express');
const activityController = require('../controller/activityController');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const auth = require("../utils/auth");
const router = express.Router();

router.post("/crossword", auth, activityController.createActivity);

module.exports = router;


