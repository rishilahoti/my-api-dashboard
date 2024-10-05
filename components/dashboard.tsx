'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { fetchData } from '../api/fetchData';
import { useTheme } from '../components/theme-context';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface NewKey {
	id: number;
	apiUrl: string;
	method: 'GET' | 'POST';
	body: string;
	isCustomUrl: boolean;
}

const Dashboard: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	//optmization with chat gpt
	// Memoize API URLs to avoid re-creating on each render
	const freeApiUrls = useMemo(
		() => [
			'https://jsonplaceholder.typicode.com/posts',
			'https://jsonplaceholder.typicode.com/comments',
			'https://jsonplaceholder.typicode.com/albums',
			'https://jsonplaceholder.typicode.com/photos',
			'https://jsonplaceholder.typicode.com/todos',
			'https://jsonplaceholder.typicode.com/users',
			'https://reqres.in/api/users',
			'https://catfact.ninja/fact',
			'https://dog.ceo/api/breeds/image/random',
		],
		[]
	);
	//state management for api url and default values
	const [newKeys, setNewKeys] = useState<NewKey[]>([
		{
			id: 1,
			apiUrl: freeApiUrls[0],
			method: 'GET',
			body: '',
			isCustomUrl: false,
		},
	]);
	const [results, setResults] = useState<unknown[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const addNewKey = useCallback(() => {
		//for selecting new api url
		setNewKeys((prevKeys) => [
			...prevKeys,
			{
				id: prevKeys.length + 1,
				apiUrl: '',
				method: 'GET',
				body: '',
				isCustomUrl: false,
			},
		]);
	}, []);

	const handleInputChange = useCallback(
		(index: number, name: keyof NewKey, value: string | 'GET' | 'POST') => {
			setNewKeys((prevKeys) =>
				prevKeys.map((key, i) =>
					i === index ? { ...key, [name]: value } : key
				)
			);
		},
		[]
	);

	const handleSelectChange = useCallback((index: number, value: string) => {
		setNewKeys((prevKeys) =>
			prevKeys.map((key, i) =>
				i === index
					? { ...key, apiUrl: value, isCustomUrl: value === '' }
					: key
			)
		);
	}, []);

	const executeWorkflow = useCallback(async () => {
		setLoading(true);
		setError(null);
		setResults([]);

		try {
			const resultsArray: unknown[] = []; // Use a more specific type if possible
			for (const key of newKeys) {
				const data =
					key.method === 'POST' ? JSON.parse(key.body || '{}') : null;
				const result = await fetchData<unknown>(
					key.apiUrl,
					key.method,
					data
				); // Specify the type if known
				resultsArray.push(result);
			}
			setResults(resultsArray); // Batch update results at once
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(`Error: ${err.message}`);
			} else {
				setError('An unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	}, [newKeys]);

	return (
		<div className="p-4">
			<button
				onClick={toggleTheme}
				className="button p-2 mb-4 rounded-lg"
			>
				Toggle Theme
			</button>
			{newKeys.map((key, index) => (
				<div key={key.id} className="mb-4">
					<select
						name="apiUrl"
						value={key.isCustomUrl ? '' : key.apiUrl}
						onChange={(e) =>
							handleSelectChange(index, e.target.value)
						}
						className="select border p-2 mb-2 w-full rounded-lg"
					>
						{freeApiUrls.map((url) => (
							<option key={url} value={url}>
								{url}
							</option>
						))}
						<option value="">Custom URL</option>
					</select>
					{key.isCustomUrl && (
						<input
							type="text"
							name="apiUrl"
							placeholder="API URL"
							value={key.apiUrl}
							onChange={(e) =>
								handleInputChange(
									index,
									'apiUrl',
									e.target.value
								)
							}
							className="input border p-2 mb-2 w-full rounded-lg"
						/>
					)}
					<select
						name="method"
						value={key.method}
						onChange={(e) =>
							handleInputChange(
								index,
								'method',
								e.target.value as 'GET' | 'POST'
							)
						}
						className="select border p-2 mb-2 w-full rounded-lg"
					>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
					</select>
					{key.method === 'POST' && (
						<textarea
							name="body"
							placeholder="Request Body"
							value={key.body}
							onChange={(e) =>
								handleInputChange(index, 'body', e.target.value)
							}
							className="textarea border p-2 w-full rounded-lg"
						/>
					)}
				</div>
			))}
			<button onClick={addNewKey} className="button p-2 mr-2 rounded-lg">
				Add NewKey
			</button>
			<button onClick={executeWorkflow} className="button p-2 rounded-lg">
				Execute Workflow
			</button>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{results.length > 0 && (
				<div className="mt-4">
					<h3 className="text-lg font-bold mb-2">Results:</h3>
					<div className="pre p-4 overflow-x-auto max-h-96 overflow-y-auto rounded-lg">
						{results.map((result, index) => (
							<JsonView
								key={index}
								src={result}
								theme="winter-is-coming"
								style={{
									backgroundColor:
										theme === 'light' ? '#fff' : '#011627',
									color:
										theme === 'light' ? '#000' : '#abb2bf',
								}}
								displaySize={true}
								collapsed={2}
								enableClipboard={true}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
