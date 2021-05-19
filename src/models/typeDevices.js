'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { status } = require('../helpers/properties');

const typeDevicesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status,
    createdAt: {
        type: Date,
        default: Date.now(),
        inmmutable: true
    }
});

const typeDevices = mongoose.model('typeDevices', typeDevicesSchema);

module.exports =  typeDevices;
