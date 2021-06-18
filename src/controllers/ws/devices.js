'use strict'

const Devices = require('../../models/devices');
const Rooms = require('../../models/rooms');
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

async function getDevicesByBuilding(req, res){
    try {
        let populateFields = ['idTypeDevice', 'idRoom'];
        let roomList = [];

        var status = req.query.status;
        var idBuilding = req.query.idBuilding;

        if(!status || !idBuilding){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.devices.fieldsCannotBeNull
            })
        }

        var rooms = await Rooms.find({
            'status': status,
            'idBuilding': idBuilding
        });

        if(rooms.length === 0){
            return res.status(404).send({
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            });
        }

        var devices = await Devices.find(
            {
                'status': status,
                'idBuilding': idBuilding
            }).populate(populateFields);

        if(devices.length === 0){
            return res.status(404).send({
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            });
        }

        rooms.forEach(room => {

            var deviceList = [];

            devices.forEach(device => {
                if(room._id.toString() == device.idRoom._id.toString()){
                    deviceList.push({
                        'value': device.value,
                        'status': device.status,
                        'createdAt': device.createdAt,
                        '_id': device._id,
                        'idBuilding': device.idBuilding,
                        'idTypeDevice': device.idTypeDevice,
                        'idRoom': device.idRoom._id,
                        'name': device.name
                    });
                }
            });

            if(deviceList.length > 0){
                roomList.push({
                    'room': room,
                    'devices': deviceList
                })
            }
        });

        if(roomList.length == 0){
            return res.status(404).send({
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            });
        }

        res.status(200).send({
            data: roomList
        });

        // },
        // (err, done) => {
        //     if(err){
        //         return res.status(500).send({
        //             codeReason: strings.codes[500].reasonPhrase,
        //             message: err.message
        //         });
        //     }

        //     if(done.length === 0){
        //         return res.status(404).send({
        //             codeReason: strings.codes[400][404],
        //             message: strings.errors.devices.noDataFound
        //         });
        //     }

        //     res.status(200).send({
        //         data: done
        //     });
        // }).populate(populateFields);
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

async function getDevice(req, res){
    try {
        let populateFields = ['idTypeDevice'];

        var id = req.query._id;
        var name = req.query.name;

        if(!id && !name){
            return res.status(400).send({
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.devices.fieldsCannotBeNull
            });
        }

        await Devices.findOne({
            $or: [{
                '_id': id
            },{
                'name': name
            }]
        }, (err, done) => {
            if(err){
                return res.status(500).send({
                    codeReason: strings.codes[500].reasonPhrase,
                    message: err.message
                });
            }

            if(!done){
                return res.status(500).send({
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

async function editDevice(req, res){
    try {
        var body = req.body;

        await Devices.updateOne({
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
                    message: strings.errors.devices.dataNotModified
                });
            }

            res.status(200).send({
                message: strings.response.devices.dataModified
            });
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function getDevicesByRoom(req, res){
    try {
        var status = req.query.status;
        var idRoom = req.query.idRoom;

        await Devices.find({
            'status': status,
            'idRoom': idRoom
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
        });
    } catch (err) {
        res.status(500).send({
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        });
    }
}

async function socketGetDevicesByRoom(idRoom, status){
    try {
        var response = await Devices.find({
            'status': status,
            'idRoom': idRoom
        });

        if(response.length == 0 || !response){
            return {
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            }
        }

        return {
            data: response
        }
    } catch (err) {
        return {
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        }
    }
}

async function socketGetDevicesByBuilding(idBuilding, status){
    try {
        let populateFields = ['idTypeDevice', 'idRoom'];
        let roomList = [];
        
        if(!status || !idBuilding){
            return {
                codeReason: strings.codes[400].reasonPhrase,
                message: strings.errors.devices.fieldsCannotBeNull
            }
        }

        var rooms = await Rooms.find({
            'status': status,
            'idBuilding': idBuilding
        });

        if(rooms.length === 0){
            return {
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            }
        }

        var devices = await Devices.find(
            {
                'status': status,
                'idBuilding': idBuilding
            }).populate(populateFields);

        if(devices.length === 0){
            return {
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            }
        }

        rooms.forEach(room => {

            var deviceList = [];

            devices.forEach(device => {
                if(room._id.toString() == device.idRoom._id.toString()){
                    deviceList.push({
                        'value': device.value,
                        'status': device.status,
                        'createdAt': device.createdAt,
                        '_id': device._id,
                        'idBuilding': device.idBuilding,
                        'idTypeDevice': device.idTypeDevice,
                        'idRoom': device.idRoom._id,
                        'name': device.name
                    });
                }
            });

            if(deviceList.length > 0){
                roomList.push({
                    'room': room,
                    'devices': deviceList
                })
            }
        });

        if(roomList.length == 0){
            return {
                codeReason: strings.codes[400][404],
                message: strings.errors.devices.noDataFound
            }
        }

        return {
            data: roomList
        }
    } catch (err) {
        return {
            codeReason: strings.codes[500].reasonPhrase,
            message: err.message
        }
    }
}

module.exports = {
    getDevices,
    saveDevice,
    getDevice,
    editDevice,
    getDevicesByBuilding,
    getDevicesByRoom,
    socketGetDevicesByRoom,
    socketGetDevicesByBuilding
}