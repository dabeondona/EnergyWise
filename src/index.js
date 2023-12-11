import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aboutus from "./Aboutus";
import AdminDashboard from "./AdminDashboard";
import CalendarPage from "./CalendarPage";
import ContactPage from "./ContactPage";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import PricingPage from "./PricingPage";
import PrivateRoute from "./PrivateRoute";
import RatePage from "./RatePage";
import RegistrationPage from "./RegistrationPage";
import UserListPage from "./UserListPage";
import { AuthProvider } from "./context/AuthProvider";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/Calendar" element={<CalendarPage />} />
          <Route
            path="/rate"
            element={
              <PrivateRoute>
                <RatePage />
              </PrivateRoute>
            }
          />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-lists"
            element={
              <PrivateRoute>
                <UserListPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
