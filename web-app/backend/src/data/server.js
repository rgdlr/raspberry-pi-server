require('dotenv').config();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 44380;

const ENTRYPOINT = '/api/v1';
const HOME = '/api/v1';
const HEALTH = `${HOME}/health`;
const RECORDS = `${HOME}/records`;
const URL = { ENTRYPOINT, HOME, HEALTH, RECORDS };

const SERVER = { HOST, PORT, URL };

module.exports = Object.freeze({ SERVER });

