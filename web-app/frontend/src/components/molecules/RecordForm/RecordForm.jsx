import { useEffect, useState } from 'react';
import { Alert, Button, Input } from '../../index';
import { API_ENDPOINTS } from '../../../config/api';
import './RecordForm.css';

export function RecordForm({ setShowRecordTable, setShowRecordForm, editRecord, setRefreshRecords }) {
	const [formData, setFormData] = useState({
		date: '',
		consumption: '',
		price: ''
	});
	const [alertTitle, setAlertTitle] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (editRecord) {
			setFormData({
				date: editRecord.date ?? '',
				consumption:
					editRecord.consumption !== null && editRecord.consumption !== undefined
						? String(editRecord.consumption)
						: '',
				price:
					editRecord.price !== null && editRecord.price !== undefined ? String(editRecord.price) : ''
			});
		}
	}, [editRecord]);

	const handleChange = (field) => (e) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const getCost = (consumption, price) => {
		const c = parseFloat(consumption);
		const p = parseFloat(price);
		if (isNaN(c) || isNaN(p)) return '0.000';
		return (Math.round(c * p * 1000) / 1000).toFixed(3);
	};

	const resetForm = () => {
		setFormData({ date: '', consumption: '', price: '' });
		setShowRecordTable(true);
		setShowRecordForm(false);
	};

	const submitRecord = async (event) => {
		event.preventDefault();
		const { date, consumption, price } = formData;

		if (!date || consumption === '' || price === '') {
			setAlertTitle('CHECK FIELDS');
			setAlertMessage('Date, consumption, and price must all be provided.');
			setShowAlert(true);
			return;
		}

		const numConsumption = parseFloat(consumption);
		const numPrice = parseFloat(price);
		if (isNaN(numConsumption) || isNaN(numPrice)) {
			setAlertTitle('INVALID VALUES');
			setAlertMessage('Consumption and price must be valid numeric values.');
			setShowAlert(true);
			return;
		}

		const cost = getCost(numConsumption, numPrice);

		setIsSubmitting(true);
		try {
			const response = await fetch(API_ENDPOINTS.RECORDS, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					date: date.trim(),
					consumption: numConsumption,
					price: numPrice,
					cost: parseFloat(cost)
				})
			});

			if (response.ok) {
				resetForm();
				setRefreshRecords((prev) => prev + 1);
			} else {
				const errData = await response.json().catch(() => ({}));
				setAlertTitle('FAILED TO SAVE');
				setAlertMessage(errData.message || 'Server rejected the record.');
				setShowAlert(true);
			}
		} catch (error) {
			setAlertTitle('NETWORK ERROR');
			setAlertMessage(error.message || 'Could not communicate with the backend.');
			setShowAlert(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className='records-form' onSubmit={submitRecord} onKeyDown={() => showAlert && setShowAlert(false)}>
			<div className='records-form-element'>
				<Input
					type='date'
					id='record-date'
					placeholder='Date'
					label='Date'
					value={formData.date}
					onChange={handleChange('date')}
					disabled={Boolean(editRecord && editRecord.date)}
				/>
				<Input
					type='number'
					id='record-consumption'
					placeholder='Consumption'
					label='Consumption (kWh)'
					step='any'
					value={formData.consumption}
					onChange={handleChange('consumption')}
				/>
				<Input
					type='number'
					id='record-price'
					placeholder='Price'
					label='Price (€/kWh)'
					step='any'
					value={formData.price}
					onChange={handleChange('price')}
				/>
			</div>
			<div className='records-form-buttons'>
				<Button theme='primary' className='records-form-submit' disabled={isSubmitting}>
					{isSubmitting ? 'SAVING...' : 'SUBMIT'}
				</Button>
			</div>
			{showAlert && (
				<Alert theme='danger' symbol='warning' setShowAlert={setShowAlert} title={alertTitle} message={alertMessage} />
			)}
		</form>
	);
}

