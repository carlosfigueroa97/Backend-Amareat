'use strict';

var utils = require('../utils/writer.js');
var Buildings = require('../service/BuildingsService');

module.exports.buildingsEditBuildingPUT = function buildingsEditBuildingPUT (req, res, next, body) {
  Buildings.buildingsEditBuildingPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buildingsGetBuildingGET = function buildingsGetBuildingGET (req, res, next, _id) {
  Buildings.buildingsGetBuildingGET(_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buildingsGetBuildingsGET = function buildingsGetBuildingsGET (req, res, next, status) {
  Buildings.buildingsGetBuildingsGET(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buildingsSaveBuildingPOST = function buildingsSaveBuildingPOST (req, res, next, body) {
  Buildings.buildingsSaveBuildingPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buildingsSearchBuildingGET = function buildingsSearchBuildingGET (req, res, next, searchValue) {
  Buildings.buildingsSearchBuildingGET(searchValue)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
