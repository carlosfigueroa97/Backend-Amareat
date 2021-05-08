'use strict'

// Import dependencies
const { connect } = require('mongoose');
const { DB_URL } = require('./config');
const strings = require('./../helpers/strings')

// Connect with the database
connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(strings.database.connection.successfull);
})
.catch((err) => {
    console.log(`${strings.database.connection.error}: ${err.message}`);
});