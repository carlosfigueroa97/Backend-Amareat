'use strict';

var utils = require('../utils/writer.js');
var TypeDevices = require('../service/TypeDevicesService');

module.exports.typeDevicesGetTypeDevicesGET = function typeDevicesGetTypeDevicesGET (req, res, next, status) {
  TypeDevices.typeDevicesGetTypeDevicesGET(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.typeDevicesSaveTypeDevicePOST = function typeDevicesSaveTypeDevicePOST (req, res, next, body) {
  TypeDevices.typeDevicesSaveTypeDevicePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
