import { useEffect, useState } from 'react';
import { Alert, Button, Input } from '../../index';
import './RecordForm.css';

export function RecordForm({ setShowRecordTable, setShowRecordForm, editRecord, setRefreshRecords }) {
	const GET_3_DECIMALS = 1000;

	const [alertTitle, setAlertTitle] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const getCost = (consumption, price) => (Math.round(parseFloat(consumption * price * GET_3_DECIMALS)) / GET_3_DECIMALS).toFixed(3);

	const resetForm = () => {
		document.getElementById('record-date').value = '';
		document.getElementById('record-consumption').value = '';
		setShowRecordTable(true);
		setShowRecordForm(false);
	};

	const checkResponse = (response) => {
		if (Math.floor(response.status / 100) === 2) {
			resetForm();
		} else {
			setAlertTitle('FAILED TO UPDATE');
			setAlertMessage('Record not created');
			setShowAlert(true);
		}
	};

	const checkForm = () => {
		setAlertTitle('CHECK FIELDS');
		setShowAlert(true);
	};

	const submitRecord = async (event) => {
		event.preventDefault();
		const date = document.getElementById('record-date').value.toLowerCase();
		const consumption = document.getElementById('record-consumption').value;
		const price = document.getElementById('record-price').value;
		const cost = getCost(consumption, price);
		if (date && consumption && price) {
			await fetch(`https://${window.location.hostname}/api/v1/records`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ date, consumption, price, cost })
			}).then(checkResponse);
		} else {
			setAlertMessage('Date, consumption and price should be given');
			checkForm();
		}
		setRefreshRecords((prev) => prev + 1);
	};

	useEffect(() => (document.getElementById('record-date').value = editRecord.date ?? ''), []);

	return (
		<form className='records-form' onSubmit={submitRecord} onKeyDown={() => showAlert && setShowAlert(false)}>
			<div className='records-form-element'>
				<Input type='date' id='record-date' placeholder={'Date'} label='Date' disabled={Boolean(editRecord.date)} />
				<Input type='number' id='record-consumption' placeholder='Consumption' label='Consumption (kWh)' />
				<Input type='number' id='record-price' placeholder='Price' label='Price (€/kWh)' />
			</div>
			<div className='records-form-buttons'>
				<Button theme='primary' className='records-form-submit' onClick={submitRecord}>
					SUBMIT
				</Button>
			</div>
			{showAlert && (
				<Alert theme='danger' symbol='warning' setShowAlert={setShowAlert} title={alertTitle} message={alertMessage} />
			)}
		</form>
	);
}
