import { useKind, useTheme } from '../../../hooks/index';
import './Button.css';

export function Button({ children, onClick, theme, kind }) {
	const checkedKind = useKind(kind);
	const checkedTheme = useTheme(theme);

	return (
		<button className={`button ${checkedKind} ${checkedTheme}`} onClick={onClick}>
			{children}
		</button>
	);
}
