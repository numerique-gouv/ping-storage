import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { ThemeProvider } from '@mui/material';
import { AlertHandlerContextProvider } from './lib/alert';

import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <AlertHandlerContextProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </AlertHandlerContextProvider>
        </QueryClientProvider>
    </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
