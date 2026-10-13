// Centralized API configuration for Raspberry Pi Server Frontend

const getApiBaseUrl = () => {
	// If custom env var is specified
	if (process.env.REACT_APP_API_URL) {
		return process.env.REACT_APP_API_URL;
	}

	// In local development (React dev server on port 3000)
	if (typeof window !== 'undefined' && window.location.port === '3000') {
		return `http://${window.location.hostname}:44380/api/v1`;
	}

	// In production (served by Nginx reverse proxy), relative path avoids any host or protocol mismatch
	return '/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
	HOME: `${API_BASE_URL}`,
	HEALTH: `${API_BASE_URL}/health`,
	RECORDS: `${API_BASE_URL}/records`,
	RECORD: (date) => `${API_BASE_URL}/records/${encodeURIComponent(date)}`
};
