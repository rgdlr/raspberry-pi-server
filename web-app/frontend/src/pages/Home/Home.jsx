import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardFooter, Alert } from '../../components';
import { API_ENDPOINTS } from '../../config/api';
import '../../styles/index.css';

function Home() {
	const navigate = useNavigate();
	const [serverStatus, setServerStatus] = useState({
		status: 'checking',
		message: 'Checking server health...'
	});

	useEffect(() => {
		let isMounted = true;
		fetch(API_ENDPOINTS.HEALTH)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((data) => {
				if (isMounted) {
					setServerStatus({
						status: 'online',
						message: `API Online • MongoDB: ${data.database || 'connected'}`,
						timestamp: data.timestamp
					});
				}
			})
			.catch((err) => {
				if (isMounted) {
					setServerStatus({
						status: 'offline',
						message: 'Backend API unreachable or offline'
					});
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className='app-container' style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
					Raspberry Pi Server
				</h1>
				<p style={{ color: 'var(--color-font-dark)', opacity: 0.85, fontSize: '1.1rem' }}>
					Automated and Configurable Home Server • Bachelor's Thesis UPM ETSI Informáticos
				</p>
			</div>

			<div style={{ marginBottom: '2rem' }}>
				{serverStatus.status === 'online' && (
					<Alert theme='success'>
						<strong>System Status:</strong> {serverStatus.message}
					</Alert>
				)}
				{serverStatus.status === 'checking' && (
					<Alert theme='information'>
						<strong>System Status:</strong> Connecting to Raspberry API...
					</Alert>
				)}
				{serverStatus.status === 'offline' && (
					<Alert theme='warning'>
						<strong>System Status:</strong> {serverStatus.message}. You can still navigate local views.
					</Alert>
				)}
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					gap: '1.5rem'
				}}
			>
				<Card theme='primary'>
					<CardHeader>
						<h3>⚡ Energy Records</h3>
					</CardHeader>
					<CardBody>
						<p style={{ marginTop: '0.5rem', minHeight: '60px' }}>
							Monitor household electricity consumption, track tariffs (€/kWh), and calculate historical costs with interactive charts and tables.
						</p>
					</CardBody>
					<CardFooter>
						<Button theme='primary' onClick={() => navigate('/records')}>
							Open Records
						</Button>
					</CardFooter>
				</Card>

				<Card theme='secondary'>
					<CardHeader>
						<h3>🎨 Component Library</h3>
					</CardHeader>
					<CardBody>
						<p style={{ marginTop: '0.5rem', minHeight: '60px' }}>
							Explore the custom Atomic Design system components (Atoms & Molecules) developed specifically for the Raspberry Pi web interface.
						</p>
					</CardBody>
					<CardFooter>
						<Button theme='secondary' onClick={() => navigate('/components')}>
							View Components
						</Button>
					</CardFooter>
				</Card>

				<Card theme='information'>
					<CardHeader>
						<h3>🌐 Raspberry Hub</h3>
					</CardHeader>
					<CardBody>
						<p style={{ marginTop: '0.5rem', minHeight: '60px' }}>
							Single access portal to self-hosted server utilities, administrative tools, documentation, and external connected services.
						</p>
					</CardBody>
					<CardFooter>
						<a href='/hub/' style={{ textDecoration: 'none' }}>
							<Button theme='information'>
								Launch Hub
							</Button>
						</a>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export default Home;

