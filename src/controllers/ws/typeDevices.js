'use strict'

const TypeDevices = require('../../models/typeDevices');
const strings = require('../../helpers/strings');

async function saveTypeDevice(req, res){
    try {
        var body = req.body;

        let typeDevices = new TypeDevices(body);

        await typeDevices.save((err) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.typeDevices.dataSaved
            })
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getTypeDevices(req, res){
    try {
        var status = req.query.status;

        if(!status){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.typeDevices.fieldsCannotBeNull
            })
        }

        await TypeDevices.find({
            'status': status
        }, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(done.length === 0){
                return res.status(404).send({
                    codeReason: strings.codes[400][404],
                    message: strings.errors.typeDevices.noDataFound
                });
            }

            res.status(200).send({
                data: done
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
    saveTypeDevice,
    getTypeDevices
}