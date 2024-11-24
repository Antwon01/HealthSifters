// App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage.jsx";
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import AdminLoginPage from "./AdminLoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import HomePage from "./HomePage.jsx";
import AdminHomePage from "./AdminHomePage.jsx"; // Import AdminHomePage

function App() {
  return (
    <Routes>
      {/* Route for LoginPage */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Route for AdminLoginPage */}
      <Route path="/adminLogin" element={<AdminLoginPage />} />

      {/* Route for ForgotPasswordPage */}
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

      {/* Route for SignUpPage */}
      <Route path="/signUp" element={<SignUpPage />} />

      {/* Route for HomePage */}
      <Route path="/homepage" element={<HomePage />} />

      {/* Route for AdminHomePage */}
      <Route path="/adminHomePage" element={<AdminHomePage />} />
    </Routes>
  );
}

export default App;