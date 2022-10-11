import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RTL } from './rtl/MuiRtl';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <AuthContextProvider>
   <Router>
   <RTL>
    <App />
    </RTL>
   </Router>
   </AuthContextProvider>
  </React.StrictMode>
);
