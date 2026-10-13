import { useEffect, useState } from 'react';
import { Button } from '../../atoms';
import { Spinner } from '../../index';
import LineChart from './LineChart';
import './RecordChart.css';

export function RecordChart({ records, showSpinner }) {
	const [lineChart, setLineChart] = useState({ label: 'Consumption', dataset: [], min: 0, max: 10 });
	const [date, setDate] = useState([]);
	const [consumption, setConsumption] = useState([]);
	const [price, setPrice] = useState([]);
	const [cost, setCost] = useState([]);

	const calcMin = (arr, factor = 0.75) => {
		if (!arr || arr.length === 0) return 0;
		const nums = arr.map(Number).filter((n) => Number.isFinite(n));
		if (nums.length === 0) return 0;
		const minVal = Math.min(...nums);
		return Math.max(0, parseFloat((minVal * factor).toFixed(2)));
	};

	const calcMax = (arr, factor = 1.25) => {
		if (!arr || arr.length === 0) return 10;
		const nums = arr.map(Number).filter((n) => Number.isFinite(n));
		if (nums.length === 0) return 10;
		const maxVal = Math.max(...nums);
		const calculated = parseFloat((maxVal * factor).toFixed(2));
		return calculated > 0 ? calculated : 10;
	};

	useEffect(() => {
		if (Array.isArray(records) && records.length > 0) {
			const dates = records.map((record) => record.date || '');
			const consumptions = records.map((record) => Number(record.consumption) || 0);
			const prices = records.map((record) => Number(record.price) || 0);
			const costs = records.map((record) => Number(record.cost) || 0);

			setDate(dates);
			setConsumption(consumptions);
			setPrice(prices);
			setCost(costs);

			setLineChart({
				label: 'Consumption',
				dataset: consumptions,
				min: calcMin(consumptions, 0.75),
				max: calcMax(consumptions, 1.25)
			});
		} else {
			setDate([]);
			setConsumption([]);
			setPrice([]);
			setCost([]);
			setLineChart({
				label: 'Consumption',
				dataset: [],
				min: 0,
				max: 10
			});
		}
	}, [records]);

	return (
		<div className='records-chart'>
			{showSpinner ? (
				<Spinner />
			) : (
				<>
					{records && records.length > 0 ? (
						<LineChart
							dataset={lineChart.dataset}
							label={lineChart.label}
							min={lineChart.min}
							max={lineChart.max}
							labels={date}
						/>
					) : (
						<div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
							<h3>No data to display in chart</h3>
							<p>Add some energy consumption records to visualize historical metrics.</p>
						</div>
					)}
					<div className='records-chart-select-container'>
						<Button
							kind={'link'}
							theme={'secondary'}
							onClick={() =>
								setLineChart({
									label: 'Consumption',
									dataset: consumption,
									min: calcMin(consumption, 0.75),
									max: calcMax(consumption, 1.25)
								})
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
								<polyline points='13 3 13 10 19 10 11 21 11 14 5 14 13 3'></polyline>
							</svg>
						</Button>
						<Button
							kind={'link'}
							theme={'secondary'}
							onClick={() =>
								setLineChart({
									label: 'Price',
									dataset: price,
									min: calcMin(price, 0.5),
									max: calcMax(price, 1.2)
								})
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
								<path d='M17.2 7a6 7 0 1 0 0 10'></path>
								<path d='M13 10h-8m0 4h8'></path>
							</svg>
						</Button>
						<Button
							kind={'link'}
							theme={'secondary'}
							onClick={() =>
								setLineChart({
									label: 'Cost',
									dataset: cost,
									min: calcMin(cost, 0.5),
									max: calcMax(cost, 1.2)
								})
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
								<path d='M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12'></path>
								<path d='M20 12v4h-4a2 2 0 0 1 0 -4h4'></path>
							</svg>
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

