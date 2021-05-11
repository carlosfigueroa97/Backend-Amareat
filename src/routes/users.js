'use strict'

const express = require('express');
const ctrl = require('../controllers/ws/users');
const router = express.Router();

router.post('/saveUser', ctrl.saveUser);

module.exports = router;