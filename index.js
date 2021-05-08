'use strict'

// Validate if the environment variable is production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
// Variables
const strings = require('./src/helpers/strings');

// Call files
const app = require('./src/config/app');
const { PORT } = require('./src/config/config');

// Initialize database
require('./src/config/database');

// Initialize server
app.listen(PORT, (err) => {
    if(err){
        console.log(`${strings.server.connection.error}}: ${err}`);
    }
    else{
        console.log(`${strings.server.connection.successfull}: ${PORT}`);
    }
});