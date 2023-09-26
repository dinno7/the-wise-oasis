import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.jsx';
import DarkModeContext from './contexts/DarkModeContext.jsx';
import GlobalStyles from './styles/GlobalStyles';
import ErrorFallback from './ui/ErrorFallback.jsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/dashboard')}>
			<DarkModeContext>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools />
					<BrowserRouter>
						<GlobalStyles />
						<App />
					</BrowserRouter>
					<Toaster
						position="top-center"
						gutter={12}
						containerStyle={{ margin: '10px' }}
						toastOptions={{
							success: {
								duration: 3000,
							},
							error: {
								duration: 5000,
							},
							style: {
								fontSize: '16px',
								maxWidth: '500px',
								padding: '16px 24px',
								backgroundColor: 'var(--color-grey-0)',
								color: 'var(--color-grey-700)',
							},
						}}
					/>
				</QueryClientProvider>
			</DarkModeContext>
		</ErrorBoundary>
	</React.StrictMode>,
);
