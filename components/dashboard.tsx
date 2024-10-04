/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { fetchData } from '../api/fetchData';
import { useTheme } from '../components/theme-context';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css'

interface NewKey {
    id: number;
    apiUrl: string;
    method: 'GET' | 'POST';
    body: string;
    isCustomUrl: boolean;
}

//dropdown list of free APIs
const freeApiUrls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/photos',
    'https://jsonplaceholder.typicode.com/todos',
    'https://jsonplaceholder.typicode.com/users',
    'https://reqres.in/api/users',
    'https://catfact.ninja/fact',
    'https://dog.ceo/api/breeds/image/random',
];

const Dashboard: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    //state management for api url and default values
    const [NewKeys, setNewKeys] = useState<NewKey[]>([
        {
            id: 1,
            apiUrl: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            body: '',
            isCustomUrl: false,
        },
    ]);
    const [results, setResults] = useState<any[]>([]); //store API results
    const [loading, setLoading] = useState<boolean>(false); //manage loading state
    const [error, setError] = useState<string | null>(null); //manage errors

    const addNewKey = () => {
        //for selecting new api url
        setNewKeys([
            ...NewKeys,
            { id: NewKeys.length + 1, apiUrl: '', method: 'GET', body: '', isCustomUrl: false },
        ]);
    };

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        //api url update
        const newNewKeys = NewKeys.map((NewKey, i) => {
            if (i !== index) return NewKey;//if not the selected index, return the same url
            return { ...NewKey, [event.target.name]: event.target.value };//update the selected url
        });
        setNewKeys(newNewKeys);
    };

    const handleSelectChange = (
        index: number,
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newNewKeys = NewKeys.map((NewKey, i) => {
            if (i !== index) return NewKey;//if not the selected index, return the same url
            const isCustomUrl = event.target.value === '';//check for custom url
            return { ...NewKey, apiUrl: event.target.value, isCustomUrl };//updated url
        });
        setNewKeys(newNewKeys);
    };

//main part and loop to call api and set api
    const executeWorkflow = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        for (const NewKey of NewKeys) {
            try {
                const data =
                    NewKey.method === 'POST' ? JSON.parse(NewKey.body) : null;
                const result = await fetchData(NewKey.apiUrl, NewKey.method, data);
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
            <button onClick={toggleTheme} className="button p-2 mb-4 rounded-lg">
                Toggle Theme
            </button>
            {NewKeys.map((NewKey, index) => (
                <div key={NewKey.id} className="mb-4">
                    <select
                        name="apiUrl"
                        value={NewKey.isCustomUrl ? '' : NewKey.apiUrl}
                        onChange={(e) => handleSelectChange(index, e)}
                        className="select border p-2 mb-2 w-full rounded-lg"
                    >
                        {freeApiUrls.map((url) => (
                            <option key={url} value={url}>
                                {url}
                            </option>
                        ))}
                        <option value="">Custom URL</option>
                    </select>
                    {NewKey.isCustomUrl && (
                        <input
                            type="text"
                            name="apiUrl"
                            placeholder="API URL"
                            value={NewKey.apiUrl}
                            onChange={(e) => handleInputChange(index, e)}
                            className="input border p-2 mb-2 w-full rounded-lg"
                        />
                    )}
                    <select
                        name="method"
                        value={NewKey.method}
                        onChange={(e) => handleInputChange(index, e)}
                        className="select border p-2 mb-2 w-full rounded-lg"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>
                    {NewKey.method === 'POST' && (
                        <textarea
                            name="body"
                            placeholder="Request Body"
                            value={NewKey.body}
                            onChange={(e) => handleInputChange(index, e)}
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
