'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { errors } = require('../helpers/strings');
const { tokenService } = errors;
const cryptoService = require('../services/crypto');

function createToken(obj){
    var value = cryptoService.encrypt(obj);

    if(value){
        const payload = {
            sub: value,
            iat: moment().unix(),
            exp: moment().add(6, 'months').unix()
        };

        const token = jwt.sign(payload, config.SECRET_TOKEN);
        
        return token;
    }

    return null;
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, config.SECRET_TOKEN);

            var sub = cryptoService.decrypt(payload.sub);

            resolve({
                sub: sub,
                token: token
            });
        } catch (err) {
            if(err.message == 'jwt expired'){
                reject({
                    statusCode: 401,
                    message: tokenService.tokenExpired
                })
            }else{
                reject({
                    statusCode: 500,
                    message: tokenService.invalidToken
                })
            }
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}