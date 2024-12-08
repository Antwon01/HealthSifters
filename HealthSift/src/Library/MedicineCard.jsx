import { useMedicineList } from "./MedicineCardContext.jsx"
import APIRequest from "../APIRequest.js"
import { useState } from "react";

function MedicineCard({index = 0, picSrc = "", title="", description="", brand="", link=""}) {
  
  const { removeMedicineCard } = useMedicineList();
  const [indexState, setIndexSate] = useState(index);

  function removeMedicine(e) {
    e.preventDefault();

    // remove cards from the list  
    removeMedicineCard(indexState)
    
    // create the object of the medicine we want to remove
    const medicineToRemove = {
      picture: picSrc,
      title: title,
      brand: brand,
      description: description,
      link: link
    }

    const data =  {medicineToRemove};

    // call backend to remove the medicine from the database
    APIRequest.removeMedicineFromLibrary(data)
    .then(response => {
        
      // get repost and save it
        const medicines = response.library;

    })
    .catch(error => {
        console.log(error);
    });

}
  
    return (

     <div className='libraryMedicineCard'>

        {/* image of the medicine */}
        <img className="cardPicture" src={picSrc} alt="Profile Picture"/>

        <div className="poppinsFont cardInformation">

            {/* name of medicine */}
            <p className="medicineTittle">{title}</p>

            <button className="cardRemoveBtn poppoinsFont" onClick={removeMedicine}> Remove </button>

            {/* brand of medicine */}
            <p className="medicineBrand"><em>{brand}</em></p>

            {/* description of the medicine */}
            <p>{description}</p>

            {/* medicine link */}
            <p className="medicineLink">{link}</p>
        </div>
     </div>
    )
}

export default MedicineCard