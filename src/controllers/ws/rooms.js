'use strict'

const Rooms = require('../../models/rooms');
const strings = require('../../helpers/strings');

async function saveRoom(req, res){
    try {
        var body = req.body;

        let rooms = new Rooms(body);

        await rooms.save((err) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            res.status(200).send({
                message: strings.response.rooms.dataSaved
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getRoom(req, res){
    try {

        var id = req.query._id;
        var name = req.query.name;

        if(!id && !name){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.rooms.fieldsCannotBeNull
            })
        }

        await Rooms.findOne({
            $or: [{
                '_id': id
            },{
                'name': name
            }]
        },
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(!done){
                return res.status(500).send({
                    codeReason: strings.codes[400][404],
                    message: strings.errors.rooms.noDataFound
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

async function getRooms(req, res){
    try {
        var status = req.query.status;

        if(!status){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.rooms.fieldsCannotBeNull
            })
        }

        await Rooms.find({
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
                    message: strings.errors.rooms.noDataFound
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

async function editRooms(req, res){
    try {
        var body = req.body;

        await Rooms.updateOne({
            '_id': body._id
        },
        body,
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(done.n == 0){
                return res.status(400).send({
                    codeReason: strings.codes[400].reasonPhrase,
                    message: strings.errors.rooms.dataNotModified
                });
            }

            res.status(200).send({
                message: strings.response.rooms.dataModified
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
    saveRoom,
    getRoom,
    getRooms,
    editRooms
}