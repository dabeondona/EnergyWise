import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Aboutus from './Aboutus';
import RatePage from './RatePage';
import PricingPage from './PricingPage';
import PrivateRoute from './PrivateRoute';
import reportWebVitals from './reportWebVitals';
import RegistrationPage from './RegistrationPage';
import AdminDashboard from './AdminDashboard';
import UserListPage from './UserListPage';
import { AuthProvider } from './context/AuthProvider';
import ContactPage from './ContactPage';
import TestPage from './TestPage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />




        <Route path="/rate" element={<PrivateRoute>
          <RatePage />
          </PrivateRoute>} />
        <Route path="/test" element={<PrivateRoute>
          <TestPage />
          </PrivateRoute>} />





        <Route path="/admin-dashboard" element={ <PrivateRoute>
          <AdminDashboard />
          </PrivateRoute>} />
        <Route path="/user-lists" element={<PrivateRoute>
          <UserListPage/>
        </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
