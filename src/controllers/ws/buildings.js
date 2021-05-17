'use strict'

const Buildings = require('../../models/buildings');
const Rooms = require('../../models/rooms');
const strings = require('../../helpers/strings');

async function saveBuilding(req, res){
    try {
        var body = req.body;

        let buildings = new Buildings(body);

        await buildings.save(async (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(body.rooms && body.rooms.length > 0){
                var roomsModel = body.rooms.map(element => {
                    return {
                        'idBuilding': done.id,
                        'name': element.name
                    }
                });

                await Rooms.create(roomsModel, (err) => {
                    if(err){
                        return res.status(500).send({
                            codeReason: strings.codes[500].reasonPhrase,
                            message: err.message
                        });
                    }

                    res.status(200).send({
                        message: strings.response.buildings.dataSaved
                    });
                });
            }else{
                res.status(200).send({
                    message: strings.response.buildings.dataSaved
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getBuildings(req, res){
    try {
        await Buildings.find({
            'status': '0'
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
                    message: strings.errors.buildings.noDataFound
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

async function getBuilding(req, res){
    try {
        var id = req.query._id;
        var name = req.query.name;

        if(!id && !name){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.buildings.fieldsCannotBeNull
            })
        }

        await Buildings.findOne({
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
                    message: strings.errors.buildings.noDataFound
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
    saveBuilding,
    getBuildings,
    getBuilding
}