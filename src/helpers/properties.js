'use strict'

const enums = require('./enums');
const { errors } = require('./strings');
const { properties } = errors;

const status = {
    type: String,
    default: 0,
    validate(value){
        var type = enums.status;
        if(!type.getValue(value)){
            throw new Error(properties.invalidStatus);
        }
    }
};

module.exports = {
    status
}