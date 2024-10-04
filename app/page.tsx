'use client'
import Dashboard from '../components/dashboard';
import { ThemeProvider } from '../components/theme-context';

export default function Home() {
	return (
		<ThemeProvider>
			<div>
				<h1 className="text-2xl font-bold mb-4">API Dashboard</h1>
				<Dashboard />
			</div>
		</ThemeProvider>
	);
}
