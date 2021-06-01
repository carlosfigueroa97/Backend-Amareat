'use strict'

const tokenService = require('../services/token');
const strings = require('../helpers/strings');
const userCtrl = require('../controllers/ws/users');
const config = require('../config/config');

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send({
            codeReason: strings.codes[400][401],
            message: strings.errors.auth.youDoNotHaveAuthorization
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    tokenService
    .decodeToken(token)
    .then(async (response) => {
        var user = await userCtrl.checkTokenInDB(response.sub, response.token);

        if(!user){
            return res.status(401).send({
                codeReason: strings.codes[400][401],
                message: strings.errors.auth.youDoNotHaveAuthorization
            });
        }

        req.token = response.token;
        req.id = response.sub;
        req.user = user;

        next();
    })
    .catch(async (response) => {
        res.status(401).send({
            codeReason: strings.codes[400][401],
            message: response.message
        });
    });
}

function isAdmin(req, res, next){
    if(!req.user.isAdmin){
        return res.status(401).send({
            codeReason: strings.codes[400][401],
            message: strings.errors.auth.youDoNotHaveAuthorization
        });
    }

    next();
}

function isAuthArduino(req, res, next){
    if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1){
        return res.status(401).send({
            codeReason: strings.codes[400][401],
            message: strings.errors.auth.youDoNotHaveAuthorization
        });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];

    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

    const [username, password] = credentials.split(':');

    if(username != config.USERNAME_ARDUINO || password != config.PASSWORD_ARDUINO){
        return res.status(401).send({
            codeReason: strings.codes[400][401],
            message: strings.errors.auth.youDoNotHaveAuthorization
        });
    }
    
    next();
}

module.exports = {
    isAuth,
    isAdmin,
    isAuthArduino
};