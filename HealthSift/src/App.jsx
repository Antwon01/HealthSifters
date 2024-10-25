import LoginPage from "./LoginPage.jsx"
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import AdminLoginPage from "./AdminLoginPage.jsx"
import SignUpPage from "./SignUpPage.jsx";
import HomePage from "./HomePage.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
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
      <Route path="/homepage"element={<HomePage/>}/>
    </Routes>
  )
}

export default App
