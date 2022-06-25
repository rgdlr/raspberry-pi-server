import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../app/App';

test('renders app title', () => {
	render(<App />);
	const appTitle = screen.getByText(/Development/i);
	expect(appTitle).toBeInTheDocument();
});
