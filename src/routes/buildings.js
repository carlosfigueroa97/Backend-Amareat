'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/buildings');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/saveBuilding', auth.isAuth, auth.isAdmin, ctrl.saveBuilding);
router.get('/getBuildings', auth.isAuth, auth.isAdmin, ctrl.getBuildings);
router.get('/getBuilding', auth.isAuth, auth.isAdmin, ctrl.getBuilding);

module.exports = router;