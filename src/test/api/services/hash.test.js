const mock = require('../../mocks/request/hash');
const functions = require('../../functions/hash');

describe('Hash functions', () => {

    test('It should return a hashed string of sixty length', () => {
        var response = functions.hashField(mock.password);
        expect(typeof(response)).toBe('string');
        expect(response.length).toBe(60);
    });

    test('It should return true', () => {
        var response = functions.compareHash(mock.password);
        expect(response).toBe(true);
    });

});