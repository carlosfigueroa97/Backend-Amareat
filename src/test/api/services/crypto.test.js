const mock = require('../../mocks/request/crypto');
const functions = require('../../functions/crypto');

describe('Crypto functions', () => {

    test('It should return a string encrypted', () => {
        var response = functions.encrypt(mock.text);
        expect(typeof(response)).toBe('string');
    });

    test('It should return a string abhsql19snjh23', () => {
        var response = functions.decrypt(mock.text);
        
        expect(typeof(response)).toBe('string');
        expect(response).toBe(mock.text);
    });

});