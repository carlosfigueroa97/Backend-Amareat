'use strict'

const bcrypt = require('bcrypt');

function hash(field){
    var salt = bcrypt.genSaltSync(10);

    if(salt){
        var encrypted = bcrypt.hashSync(field, salt, null);

        if(encrypted){
            return encrypted;
        }
    }

    return null;
}

function compareHash(property, hash){
    var result = bcrypt.compareSync(property, hash);

    return result;
}

module.exports = {
    hash,
    compareHash
}