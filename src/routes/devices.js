'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/devices');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getDevices', auth.isAuth, ctrl.getDevices);

router.post('/saveDevice', auth.isAuth, auth.isAdmin, ctrl.saveDevice);

module.exports = router;