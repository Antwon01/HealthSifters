import Login from "./Login.jsx"
import ForgotPassword from "./ForgotPassword.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <div className="loginPage">
              <Login/>
            </div>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
