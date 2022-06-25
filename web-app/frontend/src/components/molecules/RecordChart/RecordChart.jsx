import { useEffect, useState } from 'react';
import { Button } from '../../atoms';
import { Spinner } from '../../index';
import LineChart from './LineChart';
import './RecordChart.css';

export function RecordChart({ records, showSpinner }) {
	const [lineChart, setLineChart] = useState({ label: null, dataset: null });
	const [date, setDate] = useState([]);
	const [consumption, setConsumption] = useState([]);
	const [price, setPrice] = useState([]);
	const [cost, setCost] = useState([]);

	useEffect(() => {
		if (typeof records !== 'undefined') {
			const defaultDataset = records.map((record) => record.consumption);
			setDate(records.map((record) => record.date));
			setConsumption(records.map((record) => record.consumption));
			setPrice(records.map((record) => record.price));
			setCost(records.map((record) => record.cost));
			setLineChart({
				label: 'Consumption',
				dataset: defaultDataset,
				min: Math.min(...defaultDataset) * 0.75,
				max: Math.max(...defaultDataset) * 1.25
			});
		}
	}, [records]);

	return (
		<div className='records-chart'>
			{showSpinner ? (
				<Spinner />
			) : (
				<>
					<LineChart
						dataset={lineChart.dataset}
						label={lineChart.label}
						min={lineChart.min}
						max={lineChart.max}
						labels={date}
					/>
					<div className='records-chart-select-container'>
						<Button
							kind={'link'}
							theme={'secondary'}
							onClick={() =>
								setLineChart({
									label: 'Consumption',
									dataset: consumption,
									min: Math.min(...consumption) * 0.75,
									max: Math.max(...consumption) * 1.25
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
									min: Math.min(...price) * 0.5,
									max: Math.max(...price) * 1.2
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
									min: Math.min(...cost) * 0.5,
									max: Math.max(...cost) * 1.2
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
