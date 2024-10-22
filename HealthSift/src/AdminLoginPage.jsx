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

      <div className="admin">

              <p className="adminTitle">HealthSift</p>

              <p className="poppinsFont adminLoginTitle">Admin Login</p>

              <form className="adminForm" onSubmit={handleSubmit}>

                  <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="adminLabel" inputStyle="adminInformation"/>

                  <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="adminLabel" inputStyle="adminInformation"/>
                  
                  <button className="adminbtn poppinsFont" type="submit">Sign In</button>

              </form>

              <RedirectButton style="adminLoginReturnBtn" title="Back to Sign In"/>

      </div>
      
    </div>
  )
}

export default AdminLoginPage