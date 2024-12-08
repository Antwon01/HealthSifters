import { useMedicineList } from "./MedicineCardContext.jsx"
import medicinePicture from "../assets/allegraTest.jpg"
import APIRequest from "../APIRequest.js"
import { useState } from "react";

function MedicineCard({index = 0, name="", use="", reviews="", link=""}) {
  
  const { removeMedicineCard } = useMedicineList();
  const [indexState, setIndexSate] = useState(index);

  function removeMedicine(e) {
    e.preventDefault();

    // remove cards from the list  
    removeMedicineCard(indexState)
    
    // create the object of the medicine we want to remove
    const medicineToRemove = {
      name : name,
      use: use,
      reviews: reviews,
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
        <img className="cardPicture" src={medicinePicture} alt="Profile Picture"/>

        <div className="poppinsFont cardInformation">

            {/* name of medicine */}
            <p className="medicineTittle">{name}</p>

            <button className="cardRemoveBtn poppoinsFont" onClick={removeMedicine}> Remove </button>

            {/* brand of medicine */}
            <p className="medicineBrand"><em>{reviews}</em></p>

            {/* description of the medicine */}
            <p>{use}</p>

            {/* medicine link */}
            <a href={link} className="medicineLink">Link to Buy</a>
        </div>
     </div>
    )
}

export default MedicineCard