'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/users');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/saveUser', auth.isAuth, auth.isAdmin, ctrl.saveUser);
router.post('/signIn', ctrl.signIn);
router.post('/logout', auth.isAuth, ctrl.logout);

router.put('/refreshToken', ctrl.refreshToken);

module.exports = router;