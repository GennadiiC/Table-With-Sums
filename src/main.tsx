import * as React from 'react';
import { createRoot } from 'react-dom/client';
import ScopedCssBaseline from '@mui/material/CssBaseline';
import { Provider } from './context/context';
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <Provider>
        <App />
      </Provider>
    </ScopedCssBaseline>
  </React.StrictMode>
)


