'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/history');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getHistory', auth.isAuth, ctrl.getHistory);

router.post('/saveHistory', auth.isAuth, ctrl.saveHistory);

module.exports = router;