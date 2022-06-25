import { useState, useEffect } from 'react';

export function useFetch(url, method) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setData(null);
			setError(null);
			try {
				const response = await fetch(url, { method });
				if (response.ok) {
					const data = await response.json();
					setData(data);
					setError(null);
					setLoading(false);
				} else {
					setError(response.statusText);
					setLoading(false);
				}
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		}
		fetchData();
	}, [url, method]);

	return { data, loading, error };
}
