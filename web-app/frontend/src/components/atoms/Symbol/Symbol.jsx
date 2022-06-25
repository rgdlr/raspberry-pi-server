import { useSymbol } from '../../../hooks';
import './Symbol.css';

export function Symbol({ className, symbol }) {
	const checkedSymbol = useSymbol(symbol);

	return <img className={`symbol ${className}`} src={checkedSymbol} />;
}
