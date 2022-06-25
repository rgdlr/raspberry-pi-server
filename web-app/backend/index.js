// -------------------- Server --------------------

const { log } = require('./src/lib/console/log.js');
const { SERVER } = require('./src/data/server.js');

// Provisionally allow acceding data from frontend
const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(SERVER.PORT, () => {
	log.blue(`Server at ${SERVER.URL.ENTRYPOINT}`);
	log.blue(JSON.stringify(SERVER.URL, null, 2));
});

// -------------------- Database --------------------

const { DATABASE } = require('./src/data/database.js');
const { getHome, getRecords, getRecord, postRecord, deleteRecord } = require('./src/api/method.js');

const mongoose = require('mongoose');
mongoose.connect(DATABASE.URL.ENTRYPOINT).then(() => log.blue(`Database at ${DATABASE.URL.ENTRYPOINT}`));

app.get(SERVER.URL.HOME, getHome);

app.get(SERVER.URL.RECORDS, getRecords);
app.get(`${SERVER.URL.RECORDS}/:date`, getRecord);
app.post(SERVER.URL.RECORDS, postRecord);
app.delete(`${SERVER.URL.RECORDS}/:date`, deleteRecord);
