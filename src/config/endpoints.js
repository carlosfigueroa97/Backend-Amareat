'use strict'

const api = require('./versions');
const oaseTools = require('oas3-tools')
const path = require('path');

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

function initSwagger(app){
    // Swagger
    var options = {
        routing: {
            controllers: path.join(__dirname, '../swagger/controllers')
        }
    }

    var configSwagger = oaseTools.expressAppConfig(path.join(__dirname, '../swagger/api/openapi.yaml'), options)
    var appSwagger = configSwagger.getApp()
    var router = appSwagger._router;
    app.use(router)
}

module.exports = {
    initWS,
    initSwagger
};