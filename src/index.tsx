import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("session") || ""
    if (config.headers && token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
