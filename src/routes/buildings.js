'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/buildings');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getBuildings', auth.isAuth, auth.isAdmin, ctrl.getBuildings);
router.get('/getBuilding', auth.isAuth, auth.isAdmin, ctrl.getBuilding);

router.post('/saveBuilding', auth.isAuth, auth.isAdmin, ctrl.saveBuilding);

router.put('/editBuilding', auth.isAuth, auth.isAdmin, ctrl.editBuilding);

module.exports = router;