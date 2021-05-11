'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/users');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/saveUser', auth.isAuth, auth.isAdmin, ctrl.saveUser);
router.put('/refreshToken', ctrl.refreshToken);

module.exports = router;