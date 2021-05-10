'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { errors } = require('../helpers/strings');
const { tokenService } = errors;
const hashService = require('../services/hash');

function createToken(obj){
    var hashed = hashService.hash(obj);

    if(hashed){
        const payload = {
            sub: hashed,
            iat: moment().unix(),
            exp: moment().add(6, 'months').unix()
        };

        return payload;
    }

    return null;
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.verify(token, config.SECRET_TOKEN);

            resolve({
                sub: payload.sub,
                token: token
            });
        } catch (err) {
            if(err.message == 'jwt expired'){
                reject({
                    status: 401,
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