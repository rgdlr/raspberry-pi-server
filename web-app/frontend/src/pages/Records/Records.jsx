import { useEffect, useState } from 'react';
import { Button, Hamburger, RecordForm, RecordTable } from '../../components';
import { menuItems } from '../../components/atoms/Menu/Menu';
import { RecordChart } from '../../components/molecules/RecordChart/RecordChart';
import '../../styles/index.css';

const VIEW = {
	CHART: 'CHART',
	TABLE: 'TABLE',
	FORM: 'FORM',
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

	const changeView = () => (view === VIEW.TABLE ? VIEW.CHART : VIEW.TABLE);

	const getRecords = async () => {
		setShowSpinner(true);
		await fetch(`https://${window.location.hostname}/api/v1/records`, { method: 'GET' })
			.then((response) => response.json())
			.then((data) => setRecords(data.sort((a, b) => a.date.localeCompare(b.date))));
		setShowSpinner(false);
	};

	useEffect(() => getRecords(), [refreshRecords]);

	return (
		<div className='app-container'>
			<Hamburger items={menuItems} animate='merge-and-fold' />
			<div className='app-section'>
				<h2>Records</h2>
			</div>
			<div>
				<Button
					theme={'primary'}
					onClick={() => {
						setShowRecordTable(changeView() === VIEW.TABLE);
						setShowRecordChart(changeView() === VIEW.CHART);
						setShowRecordForm(false);
						setView(changeView);
					}}
				>
					{view === VIEW.CHART ? VIEW.TABLE : VIEW.CHART}
				</Button>
				<Button
					theme={'primary'}
					onClick={() => {
						setEditRecord({ _id: null, date: null, consumption: null, price: null, cost: null });
						setShowRecordForm((prev) => !prev);
						setShowRecordTable(showRecordForm && changeView() === VIEW.TABLE);
						setShowRecordChart(showRecordForm && changeView() === VIEW.CHART);
						setView(changeView);
					}}
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
