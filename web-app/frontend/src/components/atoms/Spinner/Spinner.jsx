import './Spinner.css';

export function Spinner({ text }) {
	return (
		<div className='spinner'>
			<div className='spinner-spinner'></div>
			{text && <small className='spinner-text'>{text}</small>}
		</div>
	);
}
