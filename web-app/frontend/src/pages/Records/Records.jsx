import { useEffect, useState } from 'react';
import { Button, Hamburger, RecordForm, RecordTable } from '../../components';
import { menuItems } from '../../components/atoms/Menu/Menu';
import { RecordChart } from '../../components/molecules/RecordChart/RecordChart';
import { API_ENDPOINTS } from '../../config/api';
import '../../styles/index.css';

const VIEW = {
	CHART: 'CHART',
	TABLE: 'TABLE',
	GET_INITIAL: function () {
		return this.CHART;
	}
};

function Records() {
	const [editRecord, setEditRecord] = useState({ _id: null, date: null, consumption: null, price: null, cost: null });
	const [view, setView] = useState(VIEW.GET_INITIAL());
	const [showRecordTable, setShowRecordTable] = useState(false);
	const [showRecordChart, setShowRecordChart] = useState(true);
	const [showRecordForm, setShowRecordForm] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [records, setRecords] = useState([]);
	const [refreshRecords, setRefreshRecords] = useState(0);

	const toggleView = () => {
		if (view === VIEW.CHART) {
			setView(VIEW.TABLE);
			setShowRecordTable(true);
			setShowRecordChart(false);
			setShowRecordForm(false);
		} else {
			setView(VIEW.CHART);
			setShowRecordTable(false);
			setShowRecordChart(true);
			setShowRecordForm(false);
		}
	};

	const toggleForm = () => {
		if (showRecordForm) {
			// Cancelling form, return to active view
			setShowRecordForm(false);
			if (view === VIEW.TABLE) {
				setShowRecordTable(true);
				setShowRecordChart(false);
			} else {
				setShowRecordChart(true);
				setShowRecordTable(false);
			}
		} else {
			// Opening form to add record
			setEditRecord({ _id: null, date: null, consumption: null, price: null, cost: null });
			setShowRecordForm(true);
			setShowRecordTable(false);
			setShowRecordChart(false);
		}
	};

	const getRecords = async () => {
		setShowSpinner(true);
		try {
			const response = await fetch(API_ENDPOINTS.RECORDS);
			if (!response.ok) {
				throw new Error(`Failed to fetch records: ${response.status}`);
			}
			const data = await response.json();
			if (Array.isArray(data)) {
				setRecords(data.sort((a, b) => (a.date || '').localeCompare(b.date || '')));
			}
		} catch (error) {
			console.error('Error fetching records:', error);
		} finally {
			setShowSpinner(false);
		}
	};

	useEffect(() => {
		getRecords();
	}, [refreshRecords]);

	return (
		<div className='app-container'>
			<Hamburger items={menuItems} animate='merge-and-fold' />
			<div className='app-section'>
				<h2>Records</h2>
			</div>
			<div>
				<Button
					theme={'primary'}
					onClick={toggleView}
				>
					{view === VIEW.CHART ? 'VIEW TABLE' : 'VIEW CHART'}
				</Button>
				<Button
					theme={'primary'}
					onClick={toggleForm}
				>
					{showRecordForm ? 'CANCEL' : 'ADD'}
				</Button>
			</div>
			{showRecordForm && (
				<div className='records-form-container'>
					<RecordForm
						setShowRecordTable={setShowRecordTable}
						setShowRecordForm={setShowRecordForm}
						editRecord={editRecord}
						setRefreshRecords={setRefreshRecords}
					/>
				</div>
			)}
			{showRecordTable && (
				<div className='records-table-container'>
					<RecordTable
						records={records}
						setShowRecordTable={setShowRecordTable}
						setShowRecordForm={setShowRecordForm}
						showSpinner={showSpinner}
						setEditRecord={setEditRecord}
						setRefreshRecords={setRefreshRecords}
					/>
				</div>
			)}
			{showRecordChart && <RecordChart records={records} showSpinner={showSpinner} />}
		</div>
	);
}

export default Records;

