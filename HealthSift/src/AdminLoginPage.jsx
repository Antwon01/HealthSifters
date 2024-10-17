import RedirectButton from "./RedirectButton.jsx";
import LoginInformation from "./LoginInformation.jsx";  
import { useState } from "react";
import APIRequest from "./APIRequest.js"

function AdminLoginPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    const data = {username, password};
    APIRequest.adminLoginInformation(data);
  }

  return (
    <div className="adminLoginPage">

      <div className="login">

              <p className="loginTitle">HealthSift</p>

              <p className="poppinsFont adminLoginTitle">Admin Login</p>

              <form className="loginForm" onSubmit={handleSubmit}>

                  <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="loginLabel" inputStyle="loginInformation"/>

                  <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="loginLabel" inputStyle="loginInformation"/>
                  
                  <button className="signInbtn poppinsFont" type="submit">Sign In</button>

              </form>

              <RedirectButton style="adminLoginReturnBtn" title="Back to Sign In"/>

      </div>
      
    </div>
  )
}

export default AdminLoginPage