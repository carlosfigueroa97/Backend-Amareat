'use strict';

var utils = require('../utils/writer.js');
var Devices = require('../service/DevicesService');

module.exports.devicesEditDevicePUT = function devicesEditDevicePUT (req, res, next, body) {
  Devices.devicesEditDevicePUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.devicesGetDeviceGET = function devicesGetDeviceGET (req, res, next, _id) {
  Devices.devicesGetDeviceGET(_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.devicesGetDevicesGET = function devicesGetDevicesGET (req, res, next, status) {
  Devices.devicesGetDevicesGET(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.devicesSaveDevicePOST = function devicesSaveDevicePOST (req, res, next, body) {
  Devices.devicesSaveDevicePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
