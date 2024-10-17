import Login from "./Login.jsx"
import ForgotPassword from "./ForgotPassword.jsx";
import AdminLoginPage from "./AdminLoginPage.jsx"
import SignUp from "./SignUp.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/adminLogin" element={<AdminLoginPage/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/singUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
