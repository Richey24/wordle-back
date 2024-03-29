const express = require('express');
const router = express.Router();

const leaderboardController = require('../controller/leaderboardController');

router.get("/", leaderboardController.getWeeklyLeaderboards);

module.exports = router;