/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const fetchData = async (
	url: string,
	method: 'GET' | 'POST' = 'GET',
	data: any = null
) => {
	try {
		const response = await axios({
			method,
			url,
			data,
		});
		return response.data;
	} catch (error: any) {
		throw new Error(error.response ? error.response.data : error.message);
	}
};
