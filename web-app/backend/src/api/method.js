const Record = require('../model/record.model.js');

const getHome = (_request, response) =>
	response.status(200).send('<h1>Raspberry Pi Records</h1><a href="/api/v1/records">Access to records</a>');

const getRecords = (_request, response) => Record.find().then((records) => response.json(records));

const getRecord = (request, response) => {
	const { date } = request.params;
	Record.find({ date }).then((record) => response.json(record));
};

const postRecord = (request, response) => {
	const { date, consumption, price, cost } = request.body;
	if (!(date && consumption && price && cost)) {
		response.status(400).send({ message: 'Invalid request' });
	} else {
		Record.deleteMany({ date }).then(() =>
			Record.insertMany({ date, consumption, price, cost }).then((_record) => response.sendStatus(201))
		);
	}
};

const deleteRecord = (request, response) => {
	const { date } = request.params;
	Record.deleteMany({ date }).then((_record) => response.sendStatus(204));
};

module.exports = Object.freeze({ getHome, getRecords, getRecord, postRecord, deleteRecord });
