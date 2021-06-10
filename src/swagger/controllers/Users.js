'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.usersEditUserPUT = function usersEditUserPUT (req, res, next, body) {
  Users.usersEditUserPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGetUserGET = function usersGetUserGET (req, res, next, _id) {
  Users.usersGetUserGET(_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGetUsersGET = function usersGetUsersGET (req, res, next) {
  Users.usersGetUsersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersLogoutPOST = function usersLogoutPOST (req, res, next) {
  Users.usersLogoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersRefreshTokenPUT = function usersRefreshTokenPUT (req, res, next) {
  Users.usersRefreshTokenPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersSaveUserPOST = function usersSaveUserPOST (req, res, next, body) {
  Users.usersSaveUserPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersSearchUserGET = function usersSearchUserGET (req, res, next, searchValue) {
  Users.usersSearchUserGET(searchValue)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersSignInPOST = function usersSignInPOST (req, res, next, body) {
  Users.usersSignInPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
