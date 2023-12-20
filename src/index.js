import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aboutus from './Aboutus';
import CalendarPage from './CalendarPage';
import ContactPage from './ContactPage';
import DashboardPage from './DashboardPage';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import PasswordUpdatePage from './PasswordUpdatePage';
import PricingPage from './PricingPage';
import PrivateRoute from './PrivateRoute';
import ProfileSettingsPage from './ProfileSettingsPage';
import RatePage from './RatePage';
import RegistrationPage from './RegistrationPage';
import TestPage from './TestPage';
import UserListPage from './UserListPage';
import AdminTipsPage from './AdminTipsPage'
import { AuthProvider } from './context/AuthProvider';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import ContactPage from './ContactPage';
import TipsPage from './TipsPage';


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
          <Route path="/CalendarPage" element={<CalendarPage />} />

        <Route path="/dashboard" element={<PrivateRoute>
          <DashboardPage />
          </PrivateRoute>} />
        <Route path="/rate" element={<PrivateRoute>
          <RatePage />
          </PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute>
        <CalendarPage />
        </PrivateRoute>} />
        <Route path="/test" element={<PrivateRoute>
          <TestPage />
          </PrivateRoute>} />
        <Route path="/profilesettings" element={<PrivateRoute>
          <ProfileSettingsPage />
          </PrivateRoute>} />
        <Route path="/updatepassword" element={<PrivateRoute>
          <PasswordUpdatePage />
          </PrivateRoute>} />



        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/user-lists" element={<PrivateRoute>
          <UserListPage/>
        </PrivateRoute>} />
        <Route path="/admin-tips" element={<PrivateRoute>
          <AdminTipsPage/>
        </PrivateRoute>} />
        <Route path="/energy-tips" element={<PrivateRoute>
          <TipsPage/>
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
