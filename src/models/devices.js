'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Buildings = require('./buildings');
const Rooms = require('./rooms');
const TypeDevices = require('./typeDevices');
const { status } = require('../helpers/properties');

const devicesSchema = new Schema({
    idBuilding: {
        type: Schema.ObjectId,
        ref: Buildings,
        required: true
    },
    idRoom: {
        type: Schema.ObjectId,
        ref: Rooms,
        required: true
    },
    idTypeDevice: {
        type: Schema.ObjectId,
        ref: TypeDevices,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Boolean,
        default: false
    },
    status,
    createdAt: {
        type: Date,
        default: Date.now(),
        inmmutable: true
    }
});

const devices = mongoose.model('devices', devicesSchema);

module.exports = devices;