import RedirectButton from "./RedirectButton.jsx";
import APIRequest from "./APIRequest.js"


function Login() {

    
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

            <RedirectButton location="forgotPassword" style="loginBtns" title="Forgot Password"/>

            <RedirectButton location="" style="loginBtns" title="Sign Up"/>

        </div>
    )
}

export default Login