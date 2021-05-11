'use strict'

const tokenService = require('../services/token');
const strings = require('../helpers/strings');
const userCtrl = require('../controllers/ws/users');

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
    if(req.user.isAdmin){
        next();
    }

    res.status(401).send({
        codeReason: strings.codes[400][401],
        message: strings.errors.auth.youDoNotHaveAuthorization
    });
}

module.exports = {
    isAuth,
    isAdmin
};