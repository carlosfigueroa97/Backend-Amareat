'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/buildings');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getBuildings', auth.isAuth, ctrl.getBuildings);
router.get('/getBuilding', auth.isAuth, ctrl.getBuilding);
router.get('/searchBuilding', auth.isAuth, auth.isAdmin, ctrl.searchBuildings);

router.post('/saveBuilding', auth.isAuth, auth.isAdmin, ctrl.saveBuilding);

router.put('/editBuilding', auth.isAuth, auth.isAdmin, ctrl.editBuilding);

module.exports = router;