import MedicineCard from "./MedicineCard";
import medicinePic from "../assets/allegraTest.jpg"
import { useMedicineList } from "./MedicineCardContext.jsx"
import { useState } from "react";

function FavoriteMedicine() {

  const { medicineCards} = useMedicineList();

  return (
    <div className='libraryMedicines'>

      {/* dipslay medicine cards.  */}
        {medicineCards.map((medicine, index) => (
          <MedicineCard key={index} index={index} picSrc={medicine.picture} title={medicine.title} brand={medicine.brand} description={medicine.description} link={medicine.link} />
        ))}
        
    </div>
  )
}

export default FavoriteMedicine