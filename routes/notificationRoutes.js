const express = require("express")
const router = express.Router();

const notificationController = require('../controller/notificationController');

router.get('/', notificationController.getUserNotification)
router.post('/read', notificationController.readNotification )
router.post('/store', notificationController.createNotification)

module.exports  = router;