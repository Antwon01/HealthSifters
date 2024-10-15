import RedirectButton from "./RedirectButton.jsx";
import APIRequest from './APIRequest.js';


function ForgotPassword() {

    function handleSubmitt(event) {
        event.preventDefault();
        
        const email = event.target.elements.email.value;
        
        const data = {email};
        APIRequest.forgotPassword(data);
    }
  return (
    <div className='fogotPasswordPage'>
        
        <div className='fogotPasswordContainer'>
            
            <p className='forgotPasswordTitle poppinsFont'>Password Recovery</p>
           
            <p className=" forgotPasswordDescription poppinsFont">Do not panic! We got your back. Please enter an email where we can send a recovery email.</p>
            
            <form className='forgotPasswordForm' onSubmit={handleSubmitt}>

                <label className="loginLabel poppinsFont" htmlFor="email"><p>Email</p></label>
                <input className="emailInformation poppinsFont" type="text" name="email" id="email"></input>
                
                <button className="forgotPasswordSendBtn poppinsFont" type='submit'>Send Email</button>
            
            </form>

            <div> 
               
                <RedirectButton location="" style="forgotPasswordReturnBtn" title="Return to Login"/>
                <span className='divider'></span>
                <RedirectButton location="" style="forgotPasswordSignBtn" title="Go to Sign In"/>
            
            </div>

        </div>    
    
    </div>
  )
}

export default ForgotPassword