import RedirectButton from "./RedirectButton.jsx";
import APIRequest from './APIRequest.js';
import LoginInformation from "./LoginInformation.jsx";
import { useState } from "react";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const data = {email};
        APIRequest.forgotPassword(data);
    }
    
  return (
    <div className='fogotPasswordPage'>
        
        <div className='fogotPasswordContainer'>
            
            <p className='forgotPasswordTitle poppinsFont'>Password Recovery</p>
           
            <p className=" forgotPasswordDescription poppinsFont">Do not panic! We got your back. Please enter an email where we can send a recovery email.</p>
            
            <form className='forgotPasswordForm' onSubmit={handleSubmit}>

                <LoginInformation text="Email" type="email" labelStyle="loginLabel" inputStyle="emailInformation" getInfo={setEmail} />
                
                <button className="forgotPasswordSendBtn poppinsFont" type='submit'>Send Email</button>
            
            </form>

            <div> 
               
                <RedirectButton style="forgotPasswordReturnBtn" title="Return to Login"/>

                <span className='divider'></span>

                <RedirectButton style="forgotPasswordSignBtn" title="Go to Sign In"/>
            
            </div>

        </div>    
    
    </div>
  )
}

export default ForgotPassword