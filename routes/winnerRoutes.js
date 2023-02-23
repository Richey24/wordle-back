const express = require("express")
const winnerController = require('../controller/winnerController');

const winnerRoutes = express.Router();

winnerRoutes.get('/', winnerController.getWeeklyWinners)

module.exports = winnerRoutes