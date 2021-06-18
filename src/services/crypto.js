'use strict'

const crypto = require('crypto');
const config = require('../config/config');

function encrypt(value){
    var cipher = crypto.createCipheriv(config.ALGORITHM, config.SECRET_CRYPTO, config.IV);
    var encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

function decrypt(value){
    var decipher = crypto.createDecipheriv(config.ALGORITHM, config.SECRET_CRYPTO, config.IV);
    var decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}