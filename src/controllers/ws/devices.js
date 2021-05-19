'use strict'

const Devices = require('../../models/devices');
const strings = require('../../helpers/strings');

async function getDevices(req, res){
    try {
        let populateFields = ['idTypeDevice'];

        var status = req.query.status;

        if(!status){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.devices.fieldsCannotBeNull
            })
        }

        await Devices.find({
            'status': status
        },
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(done.length === 0){
                return res.status(404).send({
                    codeReason: strings.codes[400][404],
                    message: strings.errors.devices.noDataFound
                });
            }

            res.status(200).send({
                data: done
            });
        }).populate(populateFields);
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function saveDevice(req, res){
    try {
        var body = req.body;

        let devices = new Devices(body);

        await devices.save((err) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.devices.dataSaved
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
    getDevices,
    saveDevice
}