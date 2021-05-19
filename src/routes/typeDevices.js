'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/typeDevices');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getTypeDevices', auth.isAuth, ctrl.getTypeDevices);

router.post('/saveTypeDevice', auth.isAuth, auth.isAdmin, ctrl.saveTypeDevice);

module.exports = router;