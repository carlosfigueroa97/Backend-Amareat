'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { status } = require('../helpers/properties');
const validator = require('validator');
const { errors } = require('../helpers/strings');
const { users: userString } = errors;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(userString.invalidEmail);
            }
        }
    },
    status,
    isAdmin: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        inmmutable: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

const users = mongoose.model('users', usersSchema);

module.exports = users;