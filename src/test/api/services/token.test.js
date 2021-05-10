const mock = require('../../mocks/request/token');
const functions = require('../../functions/token');

describe('Token functions', () => {

    test('It should return a token', () => {
        var response = functions.createToken(mock.sub);
        expect(typeof(response)).toBe('string');
    });

    test('It should return a object and string abhsql19snjh23', () => {
        var response = functions.decodeToken(mock.sub);

        response.then((payload) => {
            expect(typeof(payload)).toBe('object');
            expect(payload.sub).toBe(mock.sub);
        });
    });

});