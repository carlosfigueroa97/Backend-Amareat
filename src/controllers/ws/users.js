'use strict'

const Users = require('../../models/users');
const jwt = require('jsonwebtoken');
const strings = require('../../helpers/strings');
const cryptoService = require('../../services/crypto');
const hashService = require('../../services/hash');
const tokenService = require('../../services/token');
const config = require('../../config/config');

async function checkTokenInDB(id, token){
    var user = await Users.findOne({
        'status': '0',
        'tokens.token': token
    });

    if(!user){
        return null;
    }

    return user;
};

async function saveUser(req, res){
    try {
        var body = req.body;

        var password = cryptoService.decrypt(body.password);

        if(!password){
            return res.status(500).send({
                codeReason: strings.codes[500].reasonPhrase,
                message: strings.errors.users.cannotSaveUser
            });
        }

        var passwordHashed = hashService.hash(password);

        if(!passwordHashed){
            return res.status(500).send({
                codeReason: strings.codes[500].reasonPhrase,
                message: strings.errors.users.cannotSaveUser
            });
        }

        body.password = passwordHashed;

        let users = new Users(body);

        await users.save((err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.users.savedUser
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function refreshToken(req, res){
    try {
        if(!req.headers.authorization){
            return res.status(401).send({
                codeReason: strings.codes[400][401],
                message: strings.errors.auth.youDoNotHaveAuthorization
            });
        }
    
        const oldToken = req.headers.authorization.split(' ')[1];
    
        const payload = jwt.decode(oldToken, config.SECRET_TOKEN);
    
        var user = await checkTokenInDB(payload.sub, oldToken);
    
        if(!user){
            return res.status(401).send({
                codeReason: strings.codes[400][401],
                message: strings.errors.auth.youDoNotHaveAuthorization
            });
        }
    
        user.deleteToken(oldToken);
    
        var newToken = tokenService.createToken(user.id);
    
        if(!newToken){
            return res.status(401).send({
                codeReason: strings.codes[400][401],
                message: strings.errors.auth.youDoNotHaveAuthorization
            });
        }

        user.assignToken(newToken);
    
        await Users.updateOne({
            '_id': user.id
        }, {
            'tokens': user.tokens
        }, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }
    
            res.status(200).send({
                token: newToken
            })
        });   
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        })
    }
}

async function signIn(req, res){
    try {
        let select = ['_id', 'status', 'isAdmin', 'createdAt', 'username', 'password', 'email', 'tokens'];

        var body = req.body;

        var password = cryptoService.decrypt(body.password);

        var user = await Users.findOne({
            'username': body.username,
            'status': '0',
        }).select(select);

        if(!user){
            return res.status(404).send({
                codeReason: strings.codes[400][404],
                message: strings.errors.users.userDoNotExists
            });
        }

        var passwordIsValid = hashService.compareHash(password, user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                codeReason: strings.codes[400][401],
                message: strings.errors.auth.youDoNotHaveAuthorization
            });
        }

        var token = tokenService.createToken(user.id);

        if(!token){
            return res.status(500).send({
                codeReason: strings.codes[500].reasonPhrase,
                message: strings.errors.unexpectedError
            });
        }

        user.assignToken(token);

        await Users.updateOne({
            '_id': user.id,
            'status': '0'
        },
        user,
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                token: token
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function logout(req, res){
    try {
        var user = req.user;

        user.deleteToken(req.token);

        await Users.updateOne({
            '_id': user.id,
            'status': '0'
        },{
            'tokens': user.tokens
        }, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.users.logoutSuccessfully
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getUsers(req, res){
    try {
        let select = ['status', 'isAdmin', 'createdAt', '_id', 'username', 'email'];

        await Users.find({}, 
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                data: done
            })
        }).select(select);
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getUser(req, res){
    try {
        let select = ['status', 'isAdmin', 'createdAt', '_id', 'username', 'email'];

        if(!req.query._id && !req.query.username){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.users.fieldsCannotBeNull
            });
        }

        await Users.findOne({
            $or: [{
                '_id': req.query._id
            },{
                'username': req.query.username
            }]
        }, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(!done){
                return res.status(404).send({
                    codeReason: strings.codes[400][404],
                    message: strings.errors.users.userDoNotExists
                });
            }

            res.status(200).send({
                data: done
            });
        }).select(select);   
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

module.exports = {
    saveUser,
    checkTokenInDB,
    refreshToken,
    signIn,
    logout,
    getUsers,
    getUser
};