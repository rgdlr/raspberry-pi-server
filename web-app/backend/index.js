// -------------------- Server --------------------

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { log } = require('./src/lib/console/log.js');
const { SERVER } = require('./src/data/server.js');
const { DATABASE } = require('./src/data/database.js');
const { getHome, getHealth, getRecords, getRecord, postRecord, deleteRecord } = require('./src/api/method.js');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// -------------------- Routes --------------------

app.get('/', getHome);
app.get(SERVER.URL.HOME, getHome);
app.get(SERVER.URL.HEALTH, getHealth);

app.get(SERVER.URL.RECORDS, getRecords);
app.get(`${SERVER.URL.RECORDS}/:date`, getRecord);
app.post(SERVER.URL.RECORDS, postRecord);
app.delete(`${SERVER.URL.RECORDS}/:date`, deleteRecord);

// Global Error Handler
app.use((err, _req, res, _next) => {
	console.error('Unhandled Server Error:', err);
	res.status(500).json({ error: 'Internal server error', details: err.message });
});

// -------------------- Database Connection & Start --------------------

mongoose.set('strictQuery', false);
mongoose
	.connect(DATABASE.URL.ENTRYPOINT, {

		serverSelectionTimeoutMS: 5000
	})
	.then(() => log.blue(`Database connected at ${DATABASE.URL.ENTRYPOINT}`))
	.catch((err) => {
		console.error(`⚠️ MongoDB connection error: ${err.message}`);
		console.warn('Backend starting without database connection (will retry automatically).');
	});

app.listen(SERVER.PORT, SERVER.HOST, () => {
	log.blue(`Server listening on ${SERVER.HOST}:${SERVER.PORT}`);
	log.blue(`API Entrypoint: ${SERVER.URL.ENTRYPOINT}`);
});

module.exports = app;

