/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { fetchData } from '../api/fetchData';
import ReactJson from 'react-json-view';
import { useTheme } from '../components/theme-context';

interface Step {
	id: number;
	apiUrl: string;
	method: 'GET' | 'POST';
	body: string;
}

const Dashboard: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	const [steps, setSteps] = useState<Step[]>([
		{
			id: 1,
			apiUrl: 'https://jsonplaceholder.typicode.com/posts',
			method: 'GET',
			body: '',
		},
	]);
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const addStep = () => {
		setSteps([
			...steps,
			{ id: steps.length + 1, apiUrl: '', method: 'GET', body: '' },
		]);
	};

	const handleInputChange = (
		index: number,
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const newSteps = steps.map((step, i) => {
			if (i !== index) return step;
			return { ...step, [event.target.name]: event.target.value };
		});
		setSteps(newSteps);
	};

	const executeWorkflow = async () => {
		setLoading(true);
		setError(null);
		setResults([]);

		for (const step of steps) {
			try {
				const data =
					step.method === 'POST' ? JSON.parse(step.body) : null;
				const result = await fetchData(step.apiUrl, step.method, data);
				setResults((prevResults) => [...prevResults, result]);
			} catch (err: any) {
				setError(err.message);
				break;
			}
		}
		setLoading(false);
	};

	return (
		<div className="p-4">
			<button onClick={toggleTheme} className="button p-2 mb-4">
				Toggle Theme
			</button>
			{steps.map((step, index) => (
				<div key={step.id} className="mb-4">
					<input
						type="text"
						name="apiUrl"
						placeholder="API URL"
						value={step.apiUrl}
						onChange={(e) => handleInputChange(index, e)}
						className="input border p-2 mb-2 w-full"
					/>
					<select
						name="method"
						value={step.method}
						onChange={(e) => handleInputChange(index, e)}
						className="select border p-2 mb-2 w-full"
					>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
					</select>
					{step.method === 'POST' && (
						<textarea
							name="body"
							placeholder="Request Body"
							value={step.body}
							onChange={(e) => handleInputChange(index, e)}
							className="textarea border p-2 w-full"
						/>
					)}
				</div>
			))}
			<button onClick={addStep} className="button p-2 mr-2">
				Add Step
			</button>
			<button onClick={executeWorkflow} className="button p-2">
				Execute Workflow
			</button>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{results.length > 0 && (
				<div className="mt-4">
					<h3 className="text-lg font-bold mb-2">Results:</h3>
					<div className="pre p-4 overflow-x-auto max-h-96 overflow-y-auto">
						{results.map((result, index) => (
							<ReactJson
								key={index}
								src={result}
								theme={
									theme === 'light' ? 'rjv-default' : 'tube'
								}
								style={{
									backgroundColor:
										theme === 'light' ? '#fff' : '#1d2021',
									color:
										theme === 'light' ? '#000' : '#abb2bf',
								}}
								collapsed={2}
								enableClipboard={false}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
