const adminController = require('../controller/adminController');

const auth = require("../utils/auth");
const express = require('express');

const router = express.Router();

router.get('/', adminController.dashboard );
module.exports = router;