import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip);

const COLORS = { TEXT: 'rgb(235, 235, 235)', AREA: 'rgba(200,150,200,0.3)', LINE: 'rgb(200,150,200)' };

export default function LineChart({ label, dataset, labels, min, max }) {
	const data = {
		labels,
		datasets: [
			{
				label,
				data: dataset,
				tension: 0.3,
				pointRadius: 3,
				borderColor: COLORS.LINE,
				pointBackgroundColor: COLORS.LINE,
				backgroundColor: COLORS.AREA
			}
		]
	};

	const options = {
		responsive: true,
		fill: true,
		scales: { x: { ticks: { color: COLORS.TEXT } }, y: { min, max, ticks: { color: COLORS.TEXT } } },
		plugins: { legend: { display: true, labels: { color: COLORS.TEXT } } },
		font: { size: 26 }
	};

	return <Line data={data} options={options} />;
}
