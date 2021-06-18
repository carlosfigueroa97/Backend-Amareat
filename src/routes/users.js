'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/users');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/getUsers', auth.isAuth, auth.isAdmin, ctrl.getUsers);
router.get('/getUser', auth.isAuth, auth.isAdmin, ctrl.getUser);
router.get('/searchUser', auth.isAuth, auth.isAdmin, ctrl.searchUser);
router.get('/getUserProfile', auth.isAuth, ctrl.getProfileUser);

router.post('/saveUser', auth.isAuth, auth.isAdmin, ctrl.saveUser);
router.post('/signIn', ctrl.signIn);
router.post('/logout', auth.isAuth, ctrl.logout);

router.put('/refreshToken', ctrl.refreshToken);
router.put('/editUser', auth.isAuth, auth.isAdmin, ctrl.editUser);

module.exports = router;