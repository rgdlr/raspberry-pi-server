require('dotenv').config();

const MANAGEMENT_SYSTEM = 'mongodb';
const HOST = process.env.MONGODB_HOST || 'localhost';
const NAME = process.env.MONGODB_NAME || 'raspberry';

const ENTRYPOINT = process.env.MONGODB_URI || `${MANAGEMENT_SYSTEM}://${HOST}:27017/${NAME}`;
const URL = { ENTRYPOINT };

const DATABASE = { MANAGEMENT_SYSTEM, HOST, NAME, URL };

module.exports = Object.freeze({ DATABASE });

