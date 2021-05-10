const hashService = require('../../services/hash');

const hashField = (value) => {
    var hashed = hashService.hash(value);
    return hashed;
}

const compareHash = (value) => {
    var hashed = hashField(value);
    var compared = hashService.compareHash(value, hashed);
    return compared;
}

module.exports = {
    hashField,
    compareHash
}