'use strict';

var utils = require('../utils/writer.js');
var History = require('../service/HistoryService');

module.exports.historyGetHistoryGET = function historyGetHistoryGET (req, res, next) {
  History.historyGetHistoryGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.historySaveHistoryPOST = function historySaveHistoryPOST (req, res, next, body) {
  History.historySaveHistoryPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
