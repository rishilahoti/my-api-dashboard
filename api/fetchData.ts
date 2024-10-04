/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';

// export const fetchData = async (
// 	url: string,
// 	method: 'GET' | 'POST' = 'GET',
// 	data: any = null
// ) => {
// 	try {
// 		const response = await axios({
// 			method,
// 			url,
// 			data,
// 		});
// 		return response.data;
// 	} catch (error: any) {
// 		throw new Error(error.response ? error.response.data : error.message);
// 	}
// };

export const fetchData = async (
    url: string,
    method: 'GET' | 'POST' = 'GET',
    data: any = null
) => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST' && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            // Check if response is not OK
            const errorData = await response.json().catch(() => {
                // If parsing JSON fails, return a generic message
                return { message: response.statusText };
            });
            throw new Error(errorData.message || `Error: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error('Fetch error:', error);
        throw new Error(error.message || 'An error occurred during the fetch');
    }
};


