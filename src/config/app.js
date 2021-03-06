'use strict'

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const endpoints = require('./endpoints');
const _root = path.resolve();
const config = require('./config');

// Configuration app and dependencies
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(expressLayouts);
app.use('/static', express.static(_root + `/src/public`));
app.set('view engine', 'ejs');
app.set('views', _root + '/src/views');
app.set('layout', 'layouts/layout');
app.set('port', config.PORT);

// Init WS
endpoints.initWS(app);
endpoints.initSwagger(app);

module.exports = app;