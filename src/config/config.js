'use strict'

// Export .ENV variables
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    BASE_URL: process.env.BASE_URL,
    DEV_USER: process.env.DEV_USER,
    DEV_PASS: process.env.DEV_PASS,
    SECRET_CRYPTO: process.env.SECRET_CRYPTO,
    IV: process.env.IV,
    ALGORITHM: process.env.ALGORITHM
};