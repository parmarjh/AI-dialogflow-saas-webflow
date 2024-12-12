import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Create a root element for our React application
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render our App component within StrictMode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);