const express = require('express');
const activityController = require('../controller/activityController');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const auth = require("../utils/auth");
const router = express.Router();

router.post("/crossword", auth, activityController.createActivity);
router.get('/crossword', auth, activityController.getActivity);

// Testing
router.post('/update',  activityController.levelUserUp )
module.exports = router;


