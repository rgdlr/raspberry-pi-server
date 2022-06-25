const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
	date: String,
	consumption: String,
	price: String,
	cost: String,
});

const Record = mongoose.model('record', recordSchema);

module.exports = Record;
