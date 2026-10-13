const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
	{
		date: {
			type: String,
			required: true,
			unique: true,
			index: true,
			trim: true,
			match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD']
		},
		consumption: {
			type: Number,
			required: true,
			min: [0, 'Consumption must be a non-negative number']
		},
		price: {
			type: Number,
			required: true,
			min: [0, 'Price must be a non-negative number']
		},
		cost: {
			type: Number,
			required: true,
			min: [0, 'Cost must be a non-negative number']
		}
	},
	{
		timestamps: true
	}
);

const Record = mongoose.model('record', recordSchema);

module.exports = Record;

