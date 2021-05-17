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

module.exports = {
    saveBuilding
}