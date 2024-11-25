import RedirectButton from '../components/RedirectButton.jsx';
import LoginInformation from "../components/LoginInformation.jsx";  
import Error from '../components/Error.jsx';
import { useState } from "react";
import APIRequest from "../APIRequest.js"
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {

  // use useStates to store the admin's username and password
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [displayError, setError] = useState(false)
  const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const data = {username, password};

        // calls the adminLoginInformation API and send the username and password for processing
        APIRequest.adminLoginInformation(data)
        .then(response => {
            // if the status is 2, redirect to adminHomePage.
            if (response.status === 2) {
                navigate("/adminHomePage");
            } else {
                console.log("Incorrect credentials");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

  return (
    <div className="adminLoginPage">

      <div className="admin">

              <p className="adminTitle">HealthSift</p>

              <Error setError={displayError} message="Sorry, try again. Invalid Email or Password."/>

              <p className="poppinsFont adminLoginTitle">Admin Login</p>

              {/* collects username and password for admin and calls handlSubmit on submition */}
              <form className="adminForm" onSubmit={handleSubmit}>

                  {/* collects username and password */}
                  <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="adminLabel" inputStyle="adminInformation"/>

                  <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="adminLabel" inputStyle="adminInformation"/>
                  
                  {/* when clicked, the button will submit the form */}
                  <button className="adminbtn poppinsFont" type="submit">Sign In</button>

              </form>

              {/* redirects the user to sign in */}
              <RedirectButton style="adminLoginReturnBtn" title="Back to Sign In"/>
      </div>
      
    </div>
  )
}

export default AdminLoginPage