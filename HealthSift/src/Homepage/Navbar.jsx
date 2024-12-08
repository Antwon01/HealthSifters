import RedirectButton from "../components/RedirectButton.jsx";
import ProfilePicture from "../profile/ProfilePicture.jsx"
import { useMedicineList } from "../library/MedicineCardContext.jsx"
import APIRequest from "../APIRequest.js";
import { Link } from "react-router-dom"
import { useProfile } from '../profile/ProfilePicContext.jsx';
import { useEffect } from "react";


function Navbar() {

  const { addMedicineCard } = useMedicineList();

  const { profileSrc } = useProfile();

  // if logout gets click we log out the user
  function handleLogout() {

    APIRequest.logout()
    .then(response => {
      if (response.status == 1) {
        console.log("Logout Succesful");
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  // when we try to access the library, we diplay the current users library.
  useEffect(() => { 
        APIRequest.getLibraryMedecines()
          .then(response => {
      
            const medicines = response.library // returns an array of medicine objects
      
            medicines.forEach((med, index) => {
              // Add the index to each medicine
              const medicineWithIndex = { ...med, index };
              console.log(medicineWithIndex);
              addMedicineCard(medicineWithIndex); // Pass the medicine with the index
            });

          })
          .catch(error => {
            console.log(error);
          });
  }, []);

  return (
    
    <div className="navbarContainer">
        
        <ul className="navbar">
          
          <li>

            {/* redirect user to profile */}
            <Link to={"/homepage/profile"}>
              {/* Display the users picture */}
              <ProfilePicture src={profileSrc} pictureClassName="navbarImg" mes="Profile Picture"/>

            </Link>

          </li>

          <li>

            {/* redirect user to homepage */}
            <RedirectButton location="homepage" title="Home" style="navbarItem"/>

          </li>

          <li>

            <RedirectButton title="Library" style="navbarItem" location="homepage/library"/>

          </li>

          <li onClick={handleLogout}>

            {/* redirect user to signin */}
            <RedirectButton title="Logout" style="navbarItem"/>

          </li>

        </ul>

    </div>

  )
}

export default Navbar