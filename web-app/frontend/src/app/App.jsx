import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Menu } from '../components/index';
import { Components, Home, Records } from '../pages/index';
import './App.css';

function App() {
	const menuItems = [
		{ name: 'HOME', path: '/' },
		{ name: 'COMPONENTS', path: '/components' },
		{ name: 'RECORDS', path: '/records' }
	];

	return (
		<BrowserRouter>
			<Header>
				<Menu items={menuItems} />
			</Header>
			<Routes>
				<Route path='/components' element={<Components />} />
				<Route path='/records' element={<Records />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
