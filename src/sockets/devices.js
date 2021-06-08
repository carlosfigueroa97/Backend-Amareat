'use strict'

const ctrl = require('../controllers/ws/devices');

function getDevicesByRoom(io){  
    io.on('connection', function (socket){
        console.log('Connection succesffully')

        try {

            socket.on('client data', async (data) => {
                console.log('Recibido: ' + data)
                var idRoom = data.idRoom;
                var status = data.status;


                while(true){
                    var response = await ctrl.socketGetDevicesByRoom(idRoom, status);

                    socket.emit('get devices by room', response);

                    await sleep(2000);
                }

            });
        } catch (err) {
            console.log(err.message);
        }
    });
}

function getDevicesByBuildings(io){
    io.on('connection', function (socket){
        console.log('Connection succesffully')

        try {
            socket.on('client data buildings', async (data) => {
                var obj = JSON.parse(data)
                console.log('Recibido: ' + obj)
                var idBuilding = obj.idBuilding;
                var status = obj.status;

                while(true){
                    var response = await ctrl.socketGetDevicesByBuilding(idBuilding, status);

                    socket.emit('get devices by buildings', response);

                    await sleep(2000);
                }

            });
        } catch (err) {
            console.log(err.message);
        }
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

module.exports = {
    getDevicesByRoom,
    getDevicesByBuildings
}