import { Link } from 'react-router-dom';
import './Menu.css';

export const menuItems = [
	{ name: 'HOME', path: '/' },
	{ name: 'COMPONENTS', path: '/components' },
	{ name: 'RECORDS', path: '/records' }
];

export function Menu({ items }) {
	return (
		<header className='menu-header'>
			<input className='header-input' type='checkbox' name='' id='' />
			<nav className='header-nav'>
				{items.map((item, index) => (
					<Link key={index} className='nav-item' to={item.path}>
						{item.name}
					</Link>
				))}
			</nav>
		</header>
	);
}
