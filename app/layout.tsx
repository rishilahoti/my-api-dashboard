import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/sidebar';
import { ThemeProvider } from '../components/theme-context';

export const metadata = {
	title: 'API Dashboard',
	description: 'A dashboard for chaining API requests',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
					<div className="min-h-screen flex">
						<Sidebar />
						<div className="flex flex-col flex-grow">
							<main className="flex-grow p-4 overflow-auto">
								{children}
							</main>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
