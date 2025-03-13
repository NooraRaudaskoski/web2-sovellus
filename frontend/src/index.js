import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Muutettu import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Käytetään createRoot-metodia
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web vitals
reportWebVitals();


