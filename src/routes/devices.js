'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/devices');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getDevices', auth.isAuth, ctrl.getDevices);

module.exports = router;