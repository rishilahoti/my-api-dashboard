import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
	title: 'API Dashboard',
	description: 'A dashboard for chaining API requests',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen flex flex-col">
					<header className="header p-4">API Dashboard</header>
					<main className="flex-grow p-4">{children}</main>
					<footer className="footer p-4 text-center">
						Footer Content
					</footer>
				</div>
			</body>
		</html>
	);
}
