'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Buildings = require('./buildings');
const { status } = require('../helpers/properties');

const roomsSchema = new Schema({
    idBuilding: {
        type: Schema.ObjectId,
        ref: Buildings,
        required: true
    },
    name: {
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

const rooms = mongoose.model('rooms', roomsSchema);

module.exports = rooms;