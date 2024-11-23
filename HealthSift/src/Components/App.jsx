import LoginPage from "../Login/LoginPage.jsx"
import ForgotPasswordPage from "../Login/ForgotPasswordPage.jsx";
import AdminLoginPage from "../Login/AdminLoginPage.jsx"
import SignUpPage from "../Login/SignUpPage.jsx";
import HomePage from "../Homepage/HomePage.jsx";
import { ProfileProvider } from '../Profile/ProfilePicContext.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <ProfileProvider>
      <Routes>
        
        {/* set the route "/" to LoginPage */}
        <Route path="/" element={<LoginPage/>}/>
        
        {/* set the route "/adminLogin" to AdminLoginPage */}
        <Route path="/adminLogin" element={<AdminLoginPage/>}/>

        {/* set the route "/forgotPassword" to ForgotPasswordPage */}
        <Route path="/forgotPassword" element={<ForgotPasswordPage/>}/>

        {/* set the route "/singUp" to SignUpPage */}
        <Route path="/singUp" element={<SignUpPage/>}/>

        {/* set the route "/homepage" to HomePage */}
        <Route path="/homepage/*"element={<HomePage/>}/>

      </Routes>
    </ProfileProvider>
  )
}

export default App
