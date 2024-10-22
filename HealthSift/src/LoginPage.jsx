import RedirectButton from "./RedirectButton.jsx";
import LoginInformation from "./LoginInformation.jsx";
import APIRequest from "./APIRequest.js"
import { useState } from 'react';


function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = {username, password};
        APIRequest.userLoginInfo(data);
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

                <RedirectButton location="singUp" style="loginBtns" title="Sign Up"/>

            </div>

        </div>
    )
}

export default Login