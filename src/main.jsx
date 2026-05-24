import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <App />
        <ToastContainer position="top-right" autoClose={2500} />
      </BookingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
