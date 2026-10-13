import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../app/App';

test('renders app title and navigation menu', () => {
	render(<App />);
	const appTitle = screen.getByRole('heading', { name: /Raspberry Pi Server/i });
	expect(appTitle).toBeInTheDocument();

	const navHome = screen.getByRole('link', { name: /HOME/i });
	const navRecords = screen.getByRole('link', { name: /RECORDS/i });
	expect(navHome).toBeInTheDocument();
	expect(navRecords).toBeInTheDocument();
});

