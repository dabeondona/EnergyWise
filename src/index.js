import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Aboutus from './Aboutus';
import Testpage from './Testpage';
import PrivateRoute from './PrivateRoute';
import reportWebVitals from './reportWebVitals';
import RegistrationPage from './RegistrationPage';
import { AuthProvider } from './context/AuthProvider';
import ContactPage from './ContactPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/testpage" element={<PrivateRoute>
          <Testpage />
          </PrivateRoute>} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/registration" element={<RegistrationPage/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
