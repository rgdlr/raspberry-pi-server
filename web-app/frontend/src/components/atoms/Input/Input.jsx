import './Input.css';

export function Input({ disabled, id, label, placeholder, type }) {
	return (
		<>
			{label && (
				<label htmlFor={id} className='label'>
					{label}
				</label>
			)}
			<input type={type} className='input' id={id} placeholder={placeholder ?? label} disabled={disabled} />
		</>
	);
}
