'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { status } = require('../helpers/properties');

const buildingsSchema = new Schema({
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

const buildings = mongoose.model('buildings', buildingsSchema);

module.exports = buildings;