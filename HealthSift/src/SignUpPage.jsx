import APIRequest from './APIRequest.js';
import LoginInformation from './LoginInformation.jsx';
import RedirectButton from './RedirectButton.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {

    // use useStates to campture the email, password, and repassword (used to verify in the password was correctinly inputed)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const navigate = useNavigate();

    // handles the submtion of the signUp form
    function handleSubmit(event) {
        event.preventDefault();
       
        const data = {email,password,repassword};
        
        // calls the signUpInfromation API and sends the email, passwrod, and repassword
        APIRequest.signUpInformation(data)
        .then(response => {
            
            // if the sign up was successful (1), redirect to homepage
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
    <div className='signUpPage'>
        
        <div className='signUpContainer'>
            
            <p className='signUpTitle poppinsFont'>Welcome to HealthSift</p>

            <p className=" signUpDescription poppinsFont">Please enter an email and a password.</p>
            
            {/* collects the email, password, and password confimration and calls handleSubmit on submition */}
            <form className='signUpForm' onSubmit={handleSubmit}>

                {/* create a text filed for email, password, and repassword  and capture it on email, password, and repassword states */}
                <LoginInformation getInfo={setEmail} text="Email" type="email" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setPassword} text="Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setRePassword} text="Re-Enter Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>
                
                {/* when clicked we submit the form */}
                <button className="signUpSendBtn poppinsFont" type='submit'> Login </button>
            
            </form>

            {/* redirects the user to sigUp */}
            <RedirectButton style="signUpBtns" title="Back to Sign"/>

        </div>    
    
    </div>
  )
}

export default SignUp