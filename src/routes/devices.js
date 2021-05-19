'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/devices');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getDevices', auth.isAuth, ctrl.getDevices);
router.get('/getDevice', auth.isAuth, ctrl.getDevice);

router.post('/saveDevice', auth.isAuth, auth.isAdmin, ctrl.saveDevice);

router.put('/editDevice', auth.isAuth, auth.isAdmin, ctrl.editDevice);

module.exports = router;