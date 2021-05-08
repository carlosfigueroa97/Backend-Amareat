'use strict'

const api = require('./versions');

// Initialize Web Services
function initWS(app){
    app.use(require('../routes/index'));
}

module.exports = {
    initWS
};