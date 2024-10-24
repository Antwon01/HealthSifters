import LoginPage from "./LoginPage.jsx"
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import AdminLoginPage from "./AdminLoginPage.jsx"
import SignUpPage from "./SignUpPage.jsx";
import HomePage from "./HomePage.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/adminLogin" element={<AdminLoginPage/>}/>
      <Route path="/forgotPassword" element={<ForgotPasswordPage/>}/>
      <Route path="/singUp" element={<SignUpPage/>}/>
      <Route path="/homepage"element={<HomePage/>}/>
    </Routes>
  )
}

export default App
