import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AudioProvider } from './context/audioContext.jsx';
import { AuthProvider } from './context/authContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer autoClose={3000} />
    <AuthProvider>
      <AudioProvider>
      <App />
      </AudioProvider>
      </AuthProvider>
  </React.StrictMode>
);
