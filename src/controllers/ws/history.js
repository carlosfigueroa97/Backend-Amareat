'use strict'

const History = require('../../models/history');
const strings = require('../../helpers/strings');

async function saveHistory(req, res){
    try {
        var body = req.body;

        let history = new History(body);

        await history.save((err) => {
            if(err){
                res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.history.dataSaved
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getHistory(req, res){
    try {
        let populateFields = [{
            path: 'idUser',
            model: 'users',
            select: [
                'username',
                'email',
                'status'
            ]
        }, { 
            path: 'idBuilding',
            model: 'buildings',
            select: [
                'name',
                'status'
            ]
        }, {
            path: 'idRoom',
            model: 'rooms',
            select: [
                'name',
                'status'
            ]
        }, {
            path: 'idDevice',
            model: 'devices',
            select: [
                'name',
                'status'
            ]
        }];

        await History.find({}, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(done.length === 0){
                return res.status(404).send({
                    codeReason: strings.codes[400][404],
                    message: strings.errors.history.noDataFound
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

module.exports = {
    saveHistory,
    getHistory
}