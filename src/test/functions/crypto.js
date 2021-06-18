const cryptoService = require('../../services/crypto');

const encrypt = (value) => {
    var response = cryptoService.encrypt(value);
    return response;
}

const decrypt = (value) => {
    var encrypted = encrypt(value);
    var response = cryptoService.decrypt(encrypted);
    return response;
}

module.exports = {
    encrypt,
    decrypt
}