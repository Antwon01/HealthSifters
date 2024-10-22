import APIRequest from './APIRequest.js';
import LoginInformation from './LoginInformation.jsx';
import RedirectButton from './RedirectButton.jsx';
import { useState } from 'react';

function SignUp() {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
       
        const data = {email,password,repassword};
        APIRequest.signUpInformation(data);
    }

  return (
    <div className='signUpPage'>
        
        <div className='signUpContainer'>
            
            <p className='signUpTitle poppinsFont'>Welcome to HealthSift</p>

            <p className=" signUpDescription poppinsFont">Please enter an email and a password.</p>
            
            <form className='signUpForm' onSubmit={handleSubmit}>

                <LoginInformation getInfo={setEmail} text="Email" type="email" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setPassword} text="Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setRePassword} text="Re-Enter Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>
                
                <button className="signUpSendBtn poppinsFont" type='submit'> Login </button>
            
            </form>

            <RedirectButton style="signUpBtns" title="Back to Sign"/>

        </div>    
    
    </div>
  )
}

export default SignUp