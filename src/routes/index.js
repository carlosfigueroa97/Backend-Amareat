'use strict'

const express = require('express');
const index = require('../controllers/html/index');
const router = express.Router();

router.get('/', index);

module.exports = router;