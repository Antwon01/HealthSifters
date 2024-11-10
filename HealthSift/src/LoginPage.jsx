    import RedirectButton from "./RedirectButton.jsx";
    import LoginInformation from "./LoginInformation.jsx";
    import APIRequest from "./APIRequest.js"
    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Login() {
        
        // use useState to store the username and password
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const navigate = useNavigate();
        
        // handle the login form
        function handleSubmit(e) {

            e.preventDefault();

            const data = {username, password};
            
            // get confimation from the backend and if the passsword is correct redirect to homepage.
            APIRequest.userLoginInfo(data)
            .then(response => {
                
                // if the status is 1, redirect to homepage
                if (response.status > 0) {
                    
                    navigate("/homepage");

                } else {
                    console.log("Incorrect");
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

                {/* form that will handle the email and password collection and call the handleSubmit function when submitted */}
                <form className="loginForm" onSubmit={handleSubmit}>

                    {/* create a text filed for username and password  and capture it on username and password states */}
                    <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="loginLabel" inputStyle="loginInformation"/>

                    <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="loginLabel" inputStyle="loginInformation"/>

                    {/* when the button is clicked we will submit the form */}
                    <button className="signInbtn poppinsFont" type="submit">Sign In</button>

                </form>

                {/* This buttons will redirect you to the specified location when clicked. */}
                <RedirectButton location="adminLogin" style="loginBtns" title="Login as Admin"/>

                <RedirectButton location="forgotPassword" style="loginBtns" title="Forgot Password"/>

                <RedirectButton location="signUp" style="loginBtns" title="Sign Up"/>

            </div>

        </div>
    )
}

export default Login