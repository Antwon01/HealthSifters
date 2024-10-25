import RedirectButton from "./RedirectButton.jsx";
import APIRequest from './APIRequest.js';
import LoginInformation from "./LoginInformation.jsx";
import { useState } from "react";

function ForgotPassword() {

    // use useState to store the email that we are going to sent the recovery email.
    const [email, setEmail] = useState("");

    // handle the forgotPasswordForm form
    function handleSubmit(event) {
        event.preventDefault();
        const data = {email};

        // call forgotPassword API and send in the email.
        APIRequest.forgotPassword(data);
    }
    
  return (
    <div className='fogotPasswordPage'>
        
        <div className='fogotPasswordContainer'>
            
            <p className='forgotPasswordTitle poppinsFont'>Password Recovery</p>
           
            <p className=" forgotPasswordDescription poppinsFont">Do not panic! We got your back. Please enter an email where we can send a recovery email.</p>
            
            {/* collects the email to where we are going to send the recovery email and calls handleSubmit on submition */}
            <form className='forgotPasswordForm' onSubmit={handleSubmit}>

                {/* create a text filed for email  and capture it on the email state */}
                <LoginInformation text="Email" type="email" labelStyle="loginLabel" inputStyle="emailInformation" getInfo={setEmail} />
                
                {/* when the button is clicked we will submit the form */}
                <button className="forgotPasswordSendBtn poppinsFont" type='submit'>Send Email</button>
            
            </form>

            <div> 
                
               {/* This buttons will redirect you to the specified location when clicked. */}
                <RedirectButton style="forgotPasswordReturnBtn" title="Return to Login"/>

                <span className='divider'></span>

                <RedirectButton style="forgotPasswordSignBtn" title="Go to Sign In"/>
            
            </div>

        </div>    
    
    </div>
  )
}

export default ForgotPassword