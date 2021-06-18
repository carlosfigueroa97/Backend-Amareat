'use strict'

const Enum = require('enum');
const { enums } = require('./strings');

const status = new Enum({
    0: enums.status.active,
    1: enums.status.inactive
});

module.exports = {
    status
}