const MANAGEMENT_SYSTEM = 'mongodb';
const HOST = 'localhost';
const NAME = 'raspberry';

const ENTRYPOINT = `${MANAGEMENT_SYSTEM}://${HOST}/${NAME}`;
const URL = { ENTRYPOINT };

const DATABASE = { MANAGEMENT_SYSTEM, HOST, NAME, URL };

module.exports = Object.freeze({ DATABASE });
