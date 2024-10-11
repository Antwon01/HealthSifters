import LoginInformation from "./LoginInformation.jsx"
import APIRequest from "./APIRequest.js"
import {useState} from 'react'


function Login() {

    // const [username, setUserName] = useState("");
    // const [password, setPassWord] = useState("");

    
    function handleSubmit(e) {
        e.preventDefault();
        
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        const data = {username, password};
        APIRequest.userLoginInfo(data);
    }

    return (
        <div className="login">
            <p className="loginTitle">HealthSift</p>

            <form className="loginForm" onSubmit={handleSubmit}>

                <label className="loginLabel poppinsFont" htmlFor="username"><p>Username</p></label>
                <input className="loginInformation poppinsFont" type="text" name="username" id="username"></input>

                {/* <LoginInformation type="Username" getInfo={setUserName}/> */}

                <label className="loginLabel poppinsFont" htmlFor="password"><p>Password</p></label>
                <input className="loginInformation poppinsFont" type="password" name="password" id="password"></input>
                {/* <LoginInformation type="Password" getInfo={setPassWord}/> */}

                <button className="signInbtn poppinsFont" type="submit">Sign In</button>
            </form>
            <a className="poppinsFont" href="google.com">Forgot Password?</a>
            <a className="poppinsFont" href="google.com">Sign Up</a>
        </div>
    )
}

export default Login