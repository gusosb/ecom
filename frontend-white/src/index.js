import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './styles.css';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5DEB3',
      background: '#faf9f8'
    },
    secondary: {
      main: '#fbdd7e',
    },
    white: {
      main: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: ['Roboto', 'serif'].join(',')
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)