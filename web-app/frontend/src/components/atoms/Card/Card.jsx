import { useTheme } from '../../../hooks/index';
import './Card.css';

export function Card({ children, theme }) {
	const checkedTheme = useTheme(theme);

	return <div className={`card ${checkedTheme}`}>{children}</div>;
}

export function CardHeader({ children }) {
	return <div className={`card-header`}>{children}</div>;
}

export function CardBody({ children }) {
	return <div className={`card-body`}>{children}</div>;
}

export function CardFooter({ children }) {
	return <div className={`card-footer`}>{children}</div>;
}
