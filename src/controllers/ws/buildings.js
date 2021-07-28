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
                        data: done
                    });
                });
            }else{
                res.status(200).send({
                    data: done
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
        var status = req.query.status;

        if(!status){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.buildings.fieldsCannotBeNull
            })
        }

        await Buildings.find({
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

async function editBuilding(req, res){
    try {
        var body = req.body

        await Buildings.updateOne({
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
                    message: strings.errors.buildings.dataNotModified
                });
            }

            res.status(200).send({
                message: strings.response.buildings.dataModified
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function searchBuildings(req, res){
    try {
        var searchValue = req.query.searchValue;

        if(!searchValue){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.buildings.fieldsCannotBeNull
            });
        }

        await Buildings.find({
            $or: [
                {
                    'name': {
                        $regex: searchValue,
                        $options: 'i'
                    }
                }
            ]
        },
        (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(done.length === 0){
                return res.status(400).send({
                    codeReason: strings.codes[400].reasonPhrase,
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
    getBuilding,
    editBuilding,
    searchBuildings
}