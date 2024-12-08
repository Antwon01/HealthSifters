import React, { useEffect, useState } from 'react'

function PasswordVerification({password="", verification=false}) {

    const [hasLetter, setHasLetter] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);
    const [hasLength, setHasLength] = useState(false);
    


    useEffect(() => {

        function checkVerification() {
            const hasLetter = /[A-Z]/.test(password); // Checks for at least one letter
            const hasNumber = /\d/.test(password);      // Checks for at least one number
            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for at least one symbol
            const hasLength = password.length >= 8; // Checks if at least 8 characters long

            //save all the values according the the criteria
            setHasLetter(hasLetter);
            setHasNumber(hasNumber);
            setHasSymbol(hasSymbol);
            setHasLength(hasLength)

            verification( hasLetter && hasNumber && hasSymbol && hasLength)
        }

        checkVerification();

    }, [password]);

    return (
    // container that holds the requirements
    <div className="verificationContainer">
        
        <p className='poppinsFont'> Password requirements are: </p>

        {/* list of all requirements */}
        <ul className='poppinsFont'> 
            <li className={hasSymbol ?  "verificationRequirement" : ""}> One symbol. </li>
            <li className={hasNumber ?  "verificationRequirement" : ""}> One number. </li>
            <li className={hasLetter ?  "verificationRequirement" : ""}> One capital letter. </li>
            <li className={hasLength ?  "verificationRequirement" : ""}> 8 Characters in Length. </li>

        </ul>

    </div>
  )
}

export default PasswordVerification