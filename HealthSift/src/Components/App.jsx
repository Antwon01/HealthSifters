import LoginPage from "../Login/LoginPage.jsx"
import ForgotPasswordPage from "../Login/ForgotPasswordPage.jsx";
import AdminLoginPage from "../Login/AdminLoginPage.jsx"
import SignUpPage from "../Login/SignUpPage.jsx";
import HomePage from "../Homepage/HomePage.jsx";
import AdminHomePage from "../AdminHomePage.jsx";
import { ProfileProvider } from '../Profile/ProfilePicContext.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <ProfileProvider>
      <Routes>
      {/* Route for LoginPage */}
      <Route path="/" element={<LoginPage/>} />
      
      {/* Route for AdminLoginPage */}
      <Route path="/adminLogin" element={<AdminLoginPage/>} />

      {/* Route for ForgotPasswordPage */}
      <Route path="/forgotPassword" element={<ForgotPasswordPage/>} />

      {/* Route for SignUpPage */}
      <Route path="/signUp" element={<SignUpPage/>} />

      {/* Route for HomePage */}
      <Route path="/homepage/*" element={<HomePage/>} />

      {/* Route for AdminHomePage */}
      <Route path="/adminHomePage" element={<AdminHomePage/>} />
    </Routes>
    </ProfileProvider>
  )
}

export default App
