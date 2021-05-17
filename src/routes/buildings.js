'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/buildings');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/saveBuilding', auth.isAuth, auth.isAdmin, ctrl.saveBuilding);

module.exports = router;