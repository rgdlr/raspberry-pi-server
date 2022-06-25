import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../../components';
// import { useDevice } from '../../hooks';
import '../../styles/index.css';

function Home() {
	const CHANGE_PAGE_TIMEOUT = 2000;
	const [navigate, setNavigate] = useState(false);
	// const { isMobile } = useDevice();

	// useEffect(() => (isMobile ? document.querySelector('body').requestFullscreen() : null), []);
	useEffect(() => setTimeout(() => setNavigate(true), CHANGE_PAGE_TIMEOUT), []);

	return navigate ? (
		<Navigate to='/records' />
	) : (
		<div className='app-container'>
			<h1>Raspberry Pi</h1>
			<div className='app-section'>
				<h2>Home</h2>
			</div>
			<Spinner text='Redirecting to records' />
		</div>
	);
}

export default Home;
