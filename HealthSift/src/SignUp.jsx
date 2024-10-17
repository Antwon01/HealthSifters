import APIRequest from './APIRequest.js';
import LoginInformation from './LoginInformation.jsx';
import RedirectButton from './RedirectButton.jsx';

function SignUp() {

    function handleSubmit(event) {
        event.preventDefault();
        
        const email = event.target.elements.email.value;
        
        const data = {email};
        APIRequest.forgotPassword(data);
    }

  return (
    <div className='fogotPasswordPage'>
        
        <div className='fogotPasswordContainer'>
            
             <p className='forgotPasswordTitle poppinsFont'>Welcome to HealthSift</p>

            <p className=" forgotPasswordDescription poppinsFont">Please enter an email and a password.</p>
            
            <form className='forgotPasswordForm' onSubmit={handleSubmit}>

                <LoginInformation text="Email" type="email" labelStyle="loginLabel" inputStyle="loginInformation"/>

                <LoginInformation text="Password" type="password" labelStyle="loginLabel" inputStyle="loginInformation"/>

                <LoginInformation text="Re-Enter Password" type="password" labelStyle="loginLabel" inputStyle="loginInformation"/>
                
                <button className="forgotPasswordSendBtn poppinsFont" type='submit'> Login </button>
            
            </form>

            <RedirectButton style="loginBtns" location="forgotPassword" title="Back to Sign"/>
        </div>    
    
    </div>
  )
}

export default SignUp