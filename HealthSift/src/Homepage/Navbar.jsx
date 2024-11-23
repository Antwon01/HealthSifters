import RedirectButton from "../Components/RedirectButton.jsx";
import ProfilePicture from "../Profile/ProfilePicture.jsx"
import { Link } from "react-router-dom"
import { useProfile } from '../Profile/ProfilePicContext.jsx';


function Navbar() {

  const { profileSrc } = useProfile();

  return (
    
    <div className="navbarContainer">
        
        <ul className="navbar">
          
          <li>

            {/* redirect user to a home (not permanent) */}
            <Link to={"/homepage/profile"}>
              {/* Display the users picture */}
              <ProfilePicture src={profileSrc} pictureClassName="navbarImg" mes="Profile Picture"/>

            </Link>

          </li>

          <li>

            {/* redirect user to a specific location (location not specified yet) */}
            <RedirectButton location="homepage" title="Home" style="navbarItem"/>

          </li>

          <li>

            {/* redirect user to a specific location (location not specified yet) */}
            <RedirectButton title="Library" style="navbarItem" location="homepage/library"/>

          </li>

          <li>

            {/* redirect user to a specific location (location not specified yet) */}
            <RedirectButton title="Logout" style="navbarItem"/>

          </li>

        </ul>

    </div>

  )
}

export default Navbar