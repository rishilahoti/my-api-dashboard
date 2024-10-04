/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { fetchData } from '../api/fetchData';

interface Step {
	id: number;
	apiUrl: string;
	method: 'GET' | 'POST';
	body: string;
}

const Dashboard: React.FC = () => {
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
			{steps.map((step, index) => (
				<div key={step.id} className="mb-4">
					<input
						type="text"
						name="apiUrl"
						placeholder="API URL"
						value={step.apiUrl}
						onChange={(e) => handleInputChange(index, e)}
						className="border p-2 mb-2 w-full"
					/>
					<select
						name="method"
						value={step.method}
						onChange={(e) => handleInputChange(index, e)}
						className="border p-2 mb-2 w-full"
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
							className="border p-2 w-full"
						/>
					)}
				</div>
			))}
			<button
				onClick={addStep}
				className="bg-blue-500 text-white p-2 mr-2"
			>
				Add Step
			</button>
			<button
				onClick={executeWorkflow}
				className="bg-green-500 text-white p-2"
			>
				Execute Workflow
			</button>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{results.length > 0 && (
				<div className="mt-4">
					<h3 className="text-lg font-bold mb-2">Results:</h3>
					<pre className="bg-gray-100 p-4">
						{JSON.stringify(results, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
