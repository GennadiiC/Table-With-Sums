import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from './context/context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App'
import './SCSS/main.scss'


const theme = createTheme({
  typography: {
    fontFamily:'Roboto Mono, monospace'
  }
});



const container = document.getElementById('root');
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider>
          <App />
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
)


