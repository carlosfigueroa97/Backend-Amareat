'use strict';

var utils = require('../utils/writer.js');
var Rooms = require('../service/RoomsService');

module.exports.roomsEditRoomPUT = function roomsEditRoomPUT (req, res, next, body) {
  Rooms.roomsEditRoomPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsGetRoomGET = function roomsGetRoomGET (req, res, next, _id) {
  Rooms.roomsGetRoomGET(_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsGetRoomsGET = function roomsGetRoomsGET (req, res, next, status) {
  Rooms.roomsGetRoomsGET(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsSaveRoomPOST = function roomsSaveRoomPOST (req, res, next, body) {
  Rooms.roomsSaveRoomPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
