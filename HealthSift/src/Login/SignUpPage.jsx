import APIRequest from '../APIRequest.js';
import LoginInformation from '../components/LoginInformation.jsx';
import RedirectButton from '../components/RedirectButton.jsx';
import PasswordVerification from './PasswordVerification.jsx';
import Error from "../Components/Error.jsx"
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {

    // use useStates to campture the email, password, and repassword (used to verify in the password was correctinly inputed)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [verification, setVerification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    // const [displayRequirments, setDisplayRequirements] = useState(false);

    const navigate = useNavigate();

    // handles the submtion of the signUp form
    function handleSubmit(event) {
        event.preventDefault();
       
        const data = {email,password,repassword,verification};
        
        // calls the signUpInfromation API and sends the email, passwrod, and repassword
        APIRequest.signUpInformation(data)
        .then(response => {
            
            // if the sign up was successful (1), redirect to homepage
            if (response.status > 0) {
                navigate("/");
            } else if (!verification) {
                setErrorMessage("Password does not meet the requirements")
                setError(true);
                console.log("Password does not meet the requirements");
            } else if (response.status === -2) {
                setErrorMessage("Password does not match")
                setError(true);
                console.log("Password does not match");
            } else if (response.status === -1) {
                setErrorMessage("User already exists")
                setError(true);
                console.log("User already exists");
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

            <Error setError={error} message={errorMessage}/>
            
            {/* collects the email, password, and password confimration and calls handleSubmit on submition */}
            <form className='signUpForm' onSubmit={handleSubmit}>

                {/* create a text filed for email, password, and repassword  and capture it on email, password, and repassword states */}
                <LoginInformation getInfo={setEmail} text="Email" type="email" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setPassword} text="Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>

                <LoginInformation getInfo={setRePassword} text="Re-Enter Password" type="password" labelStyle="signUpLabel" inputStyle="signUpInformation"/>
                
                {/* when clicked we submit the form */}
                <button className="signUpSendBtn poppinsFont" type='submit'> Login </button>
            
            </form>

            <PasswordVerification password={password} verification={setVerification}/>

            {/* redirects the user to sigUp */}
            <RedirectButton style="signUpBtns" title="Back to Sign"/>

        </div>    
    
    </div>
  )
}

export default SignUp;