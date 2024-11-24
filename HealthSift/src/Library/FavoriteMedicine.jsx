import MedicineCard from "./MedicineCard";
import medicinePic from "../assets/allegraTest.jpg"
import { useState } from "react";

function FavoriteMedicine() {

  const medicine = {
    picture: medicinePic,
    title: "Allegra 120mg Tablet",
    brand: "Sanofi India Ltd",
    description: "Treatment of Sneezing and runny nose due to allergiesTreatment of Allergic conditions",
    link:"CVS Link"
  }

  const[medicines, editMedicine] = useState([medicine, medicine, medicine]);

  function removeMedicine(index) {
    editMedicine((prevMedicines) => prevMedicines.filter((_, i) => i != index));
  }

  return (
    <div className='libraryMedicines'>

        {medicines.map((medicine, index) => (
          <MedicineCard key={index} index={index} picSrc={medicinePic} title={medicine.title} brand={medicine.brand} description={medicine.description} link={medicine.link} remove={removeMedicine}/>
        ))}
        
    </div>
  )
}

export default FavoriteMedicine