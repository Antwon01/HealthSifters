import RedirectButton from "./RedirectButton";
import profilePic from "./assets/fakepi.png"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    
    <div className="navbarContainer">
        
        <ul className="navbar">
          
          <li>

            {/* redirect user to a home (not permanent) */}
            <Link to={"/"}>

              <img className="navbarImg" src={profilePic} alt="Profile Picture"/>
            
            </Link>

          </li>

          <li>

            {/* redirect user to a specific location (location not specified yet) */}
            <RedirectButton title="Home" style="navbarItem"/>

          </li>

          <li>

            {/* redirect user to a specific location (location not specified yet) */}
            <RedirectButton title="Library" style="navbarItem"/>

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