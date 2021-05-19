'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/rooms');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getRoom', auth.isAuth, ctrl.getRoom);
router.get('/getRooms', auth.isAuth, ctrl.getRooms);

router.post('/saveRoom', auth.isAuth, auth.isAdmin, ctrl.saveRoom);

router.put('/editRoom', auth.isAuth, auth.isAdmin, ctrl.editRooms);

module.exports = router;