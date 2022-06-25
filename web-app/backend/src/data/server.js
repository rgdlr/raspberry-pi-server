const HOST = 'localhost';
const PORT = 44380;

const ENTRYPOINT = `https://${HOST}:${PORT}/api/v1`;
const HOME = '/api/v1';
const RECORDS = `${HOME}/records`;
const URL = { ENTRYPOINT, HOME, RECORDS };

const SERVER = { HOST, PORT, URL };

module.exports = Object.freeze({ SERVER });
