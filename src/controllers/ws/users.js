'use strict'

const Users = require('../../models/users');
const strings = require('../../helpers/strings');
const cryptoService = require('../../services/crypto');
const hashService = require('../../services/hash');
const tokenService = require('../../services/token');
const config = require('../../config/config');

async function checkTokenInDB(id, token){
    var user = await Users.findOne({
        'tokens.token': token
    });

    if(!user){
        return null;
    }

    var isValid = hashService.compareHash(id, user.id);

    if(!isValid){
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
    
        await Users.updateOne({
            '_id': users.id
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

module.exports = {
    saveUser,
    checkTokenInDB,
    refreshToken
};