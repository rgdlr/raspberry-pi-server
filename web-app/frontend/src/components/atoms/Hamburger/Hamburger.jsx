import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hamburger.css';

export function Hamburger({ items, animate }) {
	const [showMenu, setShowMenu] = useState(false);
	const animations = ['merge-and-fold', 'rotate-and-underline', 'rotate-and-hide', 'rotate-and-rotate'];
	const getAnimation = animations.find((animation) => animation === animate) ?? '';

	return (
		<>
			<div className={`hamburger ${getAnimation}`}>
				<input
					className='hamburger-checkbox'
					type='checkbox'
					onClick={() => setShowMenu((previousState) => !previousState)}
				/>
				<div className='hamburger-open-first-bar'></div>
				<div className='hamburger-open-second-bar'></div>
				<div className='hamburger-open-third-bar'></div>
				<div className='hamburger-close-first-bar'></div>
				<div className='hamburger-close-second-bar'></div>
			</div>
			{showMenu && (
				<div className='hamburger-menu'>
					<div className='hamburger-menu-overlay' />
					<div className='hamburger-menu-content'>
						{items &&
							items.map((item, index) => (
								<Link key={index} to={item.path} className='hamburger-menu-content-item'>
									{item.name}
								</Link>
							))}
					</div>
				</div>
			)}
		</>
	);
}
