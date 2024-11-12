// AdminLoginPage.jsx

import RedirectButton from "./RedirectButton.jsx";
import LoginInformation from "./LoginInformation.jsx";  
import { useState } from "react";
import APIRequest from "./APIRequest.js"
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
    // use useState to store the admin's username and password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
                <p className="poppinsFont adminLoginTitle">Admin Login</p>
                <form className="adminForm" onSubmit={handleSubmit}>
                    <LoginInformation text="Username" type="username" getInfo={setUsername} labelStyle="adminLabel" inputStyle="adminInformation"/>
                    <LoginInformation text="Password" type="password" getInfo={setPassword} labelStyle="adminLabel" inputStyle="adminInformation"/>
                    <button className="adminbtn poppinsFont" type="submit">Sign In</button>
                </form>
                <RedirectButton location="/" style="adminLoginReturnBtn" title="Back to Sign In"/>
            </div>
        </div>
    )
}

export default AdminLoginPage