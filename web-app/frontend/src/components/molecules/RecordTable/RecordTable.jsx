import { Spinner } from '../../index';
import { API_ENDPOINTS } from '../../../config/api';
import './RecordTable.css';

export function RecordTable({
	records,
	setShowRecordTable,
	setShowRecordForm,
	showSpinner,
	setEditRecord,
	setRefreshRecords
}) {
	const deleteRecord = async (date) => {
		try {
			const res = await fetch(API_ENDPOINTS.RECORD(date), { method: 'DELETE' });
			if (!res.ok) {
				console.error(`Failed to delete record ${date}:`, res.statusText);
			}
		} catch (error) {
			console.error(`Error deleting record ${date}:`, error);
		} finally {
			setRefreshRecords((prev) => prev + 1);
		}
	};

	const editRecord = async ({ _id, date, consumption, price, cost }) => {
		setShowRecordTable(false);
		setShowRecordForm(true);
		setEditRecord({ _id, date, consumption, price, cost });
	};

	return (
		<>
			{showSpinner ? (
				<Spinner />
			) : (
				<table className='records-table'>
					<thead>
						<tr>
							<th className='records-table-head-cell'>Date</th>
							<th className='records-table-head-cell'>Consumption</th>
							<th className='records-table-head-cell'>Price</th>
							<th className='records-table-head-cell'>Cost</th>
							<th className='records-table-head-cell' colSpan='2'>
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{records && records.length > 0 ? (
							records.map(({ _id, date, consumption, price, cost }) => (
								<tr key={_id || date} data-record-id={_id}>
									<td className='records-table-body-cell'>{date}</td>
									<td className='records-table-body-cell'>{consumption} kWh</td>
									<td className='records-table-body-cell'>{price} €/kWh</td>
									<td className='records-table-body-cell'>{cost} €</td>
									<td
										className='records-table-body-cell edit'
										onClick={() => editRecord({ _id, date, consumption, price, cost })}
									>
										✎
									</td>
									<td className='records-table-body-cell delete' onClick={() => deleteRecord(date)}>
										✕
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='6' className='records-table-body-cell' style={{ textAlign: 'center', padding: '1.5rem' }}>
									No records found. Click ADD to create a new record.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
		</>
	);
}

