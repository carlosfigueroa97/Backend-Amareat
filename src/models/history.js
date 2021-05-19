'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Buildings = require('./buildings');
const Rooms = require('./rooms');
const Devices = require('./devices');
const Users = require('./users');

const historySchema = new Schema({
    idUser: {
        type: Schema.ObjectId,
        ref: Users,
        required: true
    },
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
    idDevice: {
        type: Schema.ObjectId,
        ref: Devices,
        required: true
    },
    change: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        inmmutable: true
    }
});

const history = mongoose.model('history', historySchema);

module.exports = history;