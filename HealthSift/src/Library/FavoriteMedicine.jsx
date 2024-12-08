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
          <MedicineCard key={index} index={index} name={medicine.name} use={medicine.use} reviews={medicine.reviews} link={medicine.link} />
        ))}
        
    </div>
  )
}

export default FavoriteMedicine