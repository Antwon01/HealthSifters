// LoginPage.jsx

import RedirectButton from "./RedirectButton.jsx";
import LoginInformation from "./LoginInformation.jsx";
import APIRequest from "./APIRequest.js"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    // use useState to store the username and password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
    // handle the login form
    function handleSubmit(e) {
        e.preventDefault();
        const data = {username, password};
        
        // get confirmation from the backend and if the password is correct redirect to homepage.
        APIRequest.userLoginInfo(data)
        .then(response => {
            // if the status is 1, redirect to homepage
            if (response.status === 1) {
                navigate("/homepage");
            } else {
                console.log("Incorrect credentials");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="loginPage">
            <div className="login">
                <p className="loginTitle">HealthSift</p>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="loginLabel" inputStyle="loginInformation"/>
                    <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="loginLabel" inputStyle="loginInformation"/>
                    <button className="signInbtn poppinsFont" type="submit">Sign In</button>
                </form>
                <RedirectButton location="adminLogin" style="loginBtns" title="Login as Admin"/>
                <RedirectButton location="forgotPassword" style="loginBtns" title="Forgot Password"/>
                <RedirectButton location="signUp" style="loginBtns" title="Sign Up"/>
            </div>
        </div>
    )
}

export default LoginPage