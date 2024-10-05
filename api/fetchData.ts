// export const fetchData = async <T>(
// 	url: string,
// 	method: 'GET' | 'POST' = 'GET',
// 	data: T | null = null
// ): Promise<T> => {
// 	try {
// 		const options: RequestInit = {
// 			method,
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};

// 		if (method === 'POST' && data) {
// 			options.body = JSON.stringify(data);
// 		}

// 		const response = await fetch(url, options);

// 		if (!response.ok) {
// 			const errorData = await response.json().catch(() => ({
// 				message: response.statusText,
// 			}));
// 			throw new Error(errorData.message || `Error: ${response.status}`);
// 		}

// 		return (await response.json()) as T;
// 	} catch (error) {
// 		console.error('Fetch error:', error);
// 		throw new Error(
// 			(error as Error).message || 'An error occurred during the fetch'
// 		);
// 	}
// };

//optmization with chat gpt
//type handeling U was added to the fetchData function,  to allow for separate types for request data and response.
//It defaults to undefined when no data is provided (for GET requests).

export const fetchData = async <T, U = undefined>(
	url: string,
	method: 'GET' | 'POST' = 'GET',
	data?: U
): Promise<T> => {
	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			...(method === 'POST' && data
				? { body: JSON.stringify(data) }
				: {}),
		});

		const contentType = response.headers.get('Content-Type');

		if (!response.ok) {
			const errorMessage = contentType?.includes('application/json')
				? (await response.json()).message
				: response.statusText;
			throw new Error(errorMessage || `Error: ${response.status}`);
		}
		//fetchData function now returns an empty object when the response is not JSON, instead of throwing an error.
		return contentType?.includes('application/json')
			? await response.json()
			: ({} as T); // Return empty object if there's no JSON response
	} catch (error) {
		console.error('Fetch error:', error);
		throw new Error(
			(error as Error).message ||
				'An unexpected error occurred during the fetch'
		);
	}
};
