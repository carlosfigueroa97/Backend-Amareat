const tokenService = require('../../services/token');

const createToken = (value) => {
    var token = tokenService.createToken(value);
    return token;   
}

const decodeToken = (value) => {
    var token = createToken(value);
    var response = tokenService.decodeToken(token);
    return response;
}

module.exports = {
    createToken,
    decodeToken
}