const mongoose = require('mongoose');
const Record = require('../model/record.model.js');

const getHome = (_request, response) =>
	response.status(200).send(`
		<!DOCTYPE html>
		<html>
		<head><title>Raspberry Pi Records API</title></head>
		<body style="font-family:sans-serif;background:#181818;color:#eee;padding:2rem;">
			<h1>🍓 Raspberry Pi Server REST API</h1>
			<p>API Version: <code>v1</code></p>
			<ul>
				<li><a style="color:#4ea8de;" href="/api/v1/records">GET /api/v1/records</a> - View all consumption records</li>
				<li><a style="color:#4ea8de;" href="/api/v1/health">GET /api/v1/health</a> - API & Database health check</li>
			</ul>
		</body>
		</html>
	`);

const getHealth = (_request, response) => {
	const dbStates = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
	const dbStatus = dbStates[mongoose.connection.readyState] || 'unknown';
	return response.status(200).json({
		status: 'ok',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		database: {
			status: dbStatus,
			connected: mongoose.connection.readyState === 1
		}
	});
};

const getRecords = async (_request, response) => {
	try {
		const records = await Record.find().sort({ date: 1 });
		return response.status(200).json(records);
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

const getRecord = async (request, response) => {
	try {
		const { date } = request.params;
		const record = await Record.findOne({ date });
		if (!record) {
			return response.status(404).json({ message: `Record for date ${date} not found` });
		}
		return response.status(200).json(record);
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

const postRecord = async (request, response) => {
	try {
		const { date, consumption, price, cost } = request.body;

		if (!date || consumption === undefined || price === undefined) {
			return response.status(400).json({ message: 'Fields date, consumption, and price are required' });
		}

		const numConsumption = parseFloat(consumption);
		const numPrice = parseFloat(price);
		let numCost = cost !== undefined ? parseFloat(cost) : Math.round(numConsumption * numPrice * 1000) / 1000;

		if (isNaN(numConsumption) || isNaN(numPrice) || isNaN(numCost)) {
			return response.status(400).json({ message: 'consumption, price, and cost must be valid numbers' });
		}

		// Atomic upsert: insert or update record for the specified date
		const updatedRecord = await Record.findOneAndUpdate(
			{ date: date.trim() },
			{
				date: date.trim(),
				consumption: numConsumption,
				price: numPrice,
				cost: numCost
			},
			{ upsert: true, new: true, runValidators: true }
		);

		return response.status(201).json(updatedRecord);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const deleteRecord = async (request, response) => {
	try {
		const { date } = request.params;
		const result = await Record.findOneAndDelete({ date });
		if (!result) {
			return response.status(404).json({ message: `Record for date ${date} not found` });
		}
		return response.sendStatus(204);
	} catch (error) {
		return response.status(500).json({ error: error.message });
	}
};

module.exports = Object.freeze({ getHome, getHealth, getRecords, getRecord, postRecord, deleteRecord });

