import RedirectButton from "./RedirectButton";
import profilePic from "./assets/fakepi.png"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    
    <div className="navbarContainer">
        
        <ul className="navbar">
          
          <li>

            <Link to={"/"}>

              <img className="navbarImg" src={profilePic} alt="Profile Picture"/>
            
            </Link>

          </li>

          <li>

            <RedirectButton title="Home" style="navbarItem"/>

          </li>

          <li>

            <RedirectButton title="Library" style="navbarItem"/>

          </li>

          <li>
            <RedirectButton title="Logout" style="navbarItem"/>

          </li>

        </ul>

    </div>

  )
}

export default Navbar