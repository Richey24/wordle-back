const express = require("express")
const router = express.Router();
const auth = require("../utils/auth");

const notificationController = require('../controller/notificationController');

router.get('/', auth, notificationController.getUserNotification)
router.get('/read', auth,notificationController.readNotification )
router.post('/store', auth, notificationController.createNotification)

module.exports  = router;