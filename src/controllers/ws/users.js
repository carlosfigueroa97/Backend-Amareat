'use strict'

const Users = require('../../models/users');
const strings = require('../../helpers/strings');
const cryptoService = require('../../services/crypto');
const hashService = require('../../services/hash');

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

module.exports = {
    saveUser
};