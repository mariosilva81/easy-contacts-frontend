import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ClientContextProvider } from './providers/ClientContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientContextProvider>
        <App />
      </ClientContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
