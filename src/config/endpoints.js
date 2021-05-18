'use strict'

const api = require('./versions');

// Initialize Web Services
function initWS(app){
    app.use(require('../routes/index'));
    app.use(api.apiV1 + 'users', require('../routes/users'));
    app.use(api.apiV1 + 'buildings', require('../routes/buildings'));
}

module.exports = {
    initWS
};