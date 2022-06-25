import { useTheme } from '../../../hooks/useTheme';
import { Symbol } from '../Symbol/Symbol';
import './Alert.css';

export function Alert({ setShowAlert, message, symbol, title, theme }) {
	const checkedTheme = useTheme(theme);

	return (
		<div className={`alert ${checkedTheme}`}>
			<div className={`alert-overlay ${checkedTheme}`}></div>
			<div className={`alert-window ${checkedTheme}`}>
				<Symbol className={`alert-symbol ${checkedTheme}`} symbol={symbol} />
				<div className={`alert-title ${checkedTheme}`}>{title}</div>
				<div className={`alert-message ${checkedTheme}`}>{message}</div>
				<div className={`alert-close ${checkedTheme}`} onClick={() => setShowAlert(false)}>
					CLOSE
				</div>
			</div>
		</div>
	);
}
