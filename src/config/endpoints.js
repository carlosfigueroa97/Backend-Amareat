'use strict'

const api = require('./versions');

// Initialize Web Services
function initWS(app){
    app.use(require('../routes/index'));
    app.use(api.apiV1 + 'users', require('../routes/users'));
    app.use(api.apiV1 + 'buildings', require('../routes/buildings'));
    app.use(api.apiV1 + 'rooms', require('../routes/rooms'));
    app.use(api.apiV1 + 'devices', require('../routes/devices'));
    app.use(api.apiV1 + 'typeDevices', require('../routes/typeDevices'));
    app.use(api.apiV1 + 'history', require('../routes/history'));
}

module.exports = {
    initWS
};