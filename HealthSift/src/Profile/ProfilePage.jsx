import ProfilePicture from "./ProfilePicture.jsx"
import ProfileInformation from "../Components/ProfileInformation.jsx"
import { useState } from "react";

function ProfilePage() {

  const [picture, setPicture] = useState(null);

  // handles the submit when the user wants to change the profile pic
  function handleSubmit(e) {

    e.preventDefault();

    // checks weather the user added a file or not
    if(e.target.files.length != 0) {
      
      // convert the image into a URL
      setPicture(URL.createObjectURL(e.target.files[0]));

    }
 }

  return (
    <div className='profileContainer'>

      {/* display the profile picture */}
      <ProfilePicture src={picture} containerClassName="profilePictureContainer" pictureClassName="profilePicture" mes="Profile Picture"/>

      {/* create and input that allows the user to change the profile pic */}
      <label htmlFor="input-picture" id="inputLabel"> 

        <input id="input-picture" hidden type="file" onChange={handleSubmit}/>

        {/* display btn */}
        <div className="changePicture poppinsFont">
          Change Picture
        </div>

      </label>

      <div className="profileInfoContainer">

        {/* diplay email */}
        <ProfileInformation title="Email" information="e@gmail" containerStyle="profileInfo"/>
        
        {/* container that holds the password label and two btns */}
        <div className="ProfilePasswordContainer">

          {/* Show password and reset buttons */}
          <ProfileInformation title="Password" information=""/>

          {/* make buttons to obtain the password or to reset password */}
          <button className="poppinsFont ProfilePasswordBtn">Retrive Password</button>
          <button className="poppinsFont ProfilePasswordBtn">Reset Password</button>

        </div>
        
        {/* show admins status */}
        <ProfileInformation title="Admin" information="e@gmail" containerStyle="profileInfo"/>


      </div>

    </div>
  )
}

export default ProfilePage