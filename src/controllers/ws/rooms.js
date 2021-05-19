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

module.exports = {
    saveRoom
}