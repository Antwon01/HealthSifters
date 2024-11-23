import  { useEffect, useState } from 'react';
import APIRequest from "../APIRequest.js";
import defaultPicture from "../assets/defaultProfilePicture.jpg";
import { useProfile } from './ProfilePicContext.jsx';

function ProfilePicture({ src, containerClassName = "", pictureClassName = "", altText = "Profile Picture" }) {
    // Get initial profile picture from localStorage or default
    const getInitialProfilePic = () => localStorage.getItem('profilePic') || defaultPicture;
    const [profileSrc, setProfileSrc] = useState(getInitialProfilePic);
    const { setProfile } = useProfile();
    

    // Update localStorage and component state if src changes
    useEffect(() => {

        if (src) {

            APIRequest.toBase64UsingFetch(src)
            .then ( base64String => {
            localStorage.setItem('profilePic', base64String);
            setProfileSrc(base64String);
            setProfile(base64String);

         });

        }

    }, [src, setProfile]);

    return (
      // Contains and displayes the users picture
      <div className={containerClassName}>
        <img className={pictureClassName} src={profileSrc} alt={altText} />
      </div>
    );
}

export default ProfilePicture;
