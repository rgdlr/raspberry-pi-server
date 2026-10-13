import './Input.css';

export function Input({ disabled, id, label, placeholder, type, value, onChange, step, ...props }) {
	return (
		<>
			{label && (
				<label htmlFor={id} className='label'>
					{label}
				</label>
			)}
			<input
				type={type}
				className='input'
				id={id}
				placeholder={placeholder ?? label}
				disabled={disabled}
				value={value}
				onChange={onChange}
				step={step}
				{...props}
			/>
		</>
	);
}

