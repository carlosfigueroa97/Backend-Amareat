'use strict';


/**
 * Edit a user (only admins)
 * You can  edit a user in the database. This endpoint only used by administrators of the application. The password must be encrypted for the algorithm aes256
 *
 * body EditUser Body request to save user (optional)
 * no response value expected for this operation
 **/
exports.usersEditUserPUT = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a user
 * You can get a specific user
 *
 * _id String Object ID of the user (optional)
 * no response value expected for this operation
 **/
exports.usersGetUserGET = function(_id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all users
 * You can get all users
 *
 * no response value expected for this operation
 **/
exports.usersGetUsersGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logout
 * You can sign out
 *
 * no response value expected for this operation
 **/
exports.usersLogoutPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Refresh Token
 * You can  update the token when it's expired
 *
 * no response value expected for this operation
 **/
exports.usersRefreshTokenPUT = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Save a new user in the database (only admins)
 * You can  save a new user in the database. This endpoint only used by administrators of the application. The password must be encrypted for the algorithm aes256
 *
 * body SaveUser Body request to save user (optional)
 * no response value expected for this operation
 **/
exports.usersSaveUserPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Search a user
 * You can  search a user in the database.
 *
 * searchValue String Search a user by username or email (optional)
 * no response value expected for this operation
 **/
exports.usersSearchUserGET = function(searchValue) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Sign in
 * You can  loggin on the application
 *
 * body SignIn Body request to sign in (optional)
 * no response value expected for this operation
 **/
exports.usersSignInPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

