import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import { HelmetProvider } from 'react-helmet-async';

import { CountryCurrencyProvider } from './helpers';

import '@fontsource/jost';
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5DEB3',
      background: '#faf9f8'
    },
    secondary: {
      //main: '#fbdd7e'
      main: '#A9A9A9'
      //main: '#000000'
    },
    white: {
      main: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: ['Jost', 'Roboto', 'serif'].join(',') // Include Jost as the primary font
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CountryCurrencyProvider>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </CountryCurrencyProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
