import { useMedicineList } from "../library/MedicineCardContext.jsx"

function Medicine({medicine}) {

  const { addMedicineCard } = useMedicineList();

  return (

    <div className="medicineCard">

        {/* display the image of the medicine */}
        <img className="medicinePicture" src={medicine.picture} alt="Profile Picture"/>

        {/* holds all related information of the medicine. */}
        <div className="poppinsFont medicineInformation">

            {/* name of medicine */}
            <p className="medicineTittle">{medicine.title}</p>

            {/* brand of medicine */}
            <p className="medicineBrand"><em>{medicine.brand}</em></p>
            
            {/* description of the medicine */}
            <p>{medicine.description}</p>

            {/* medicine link */}
            <p className="medicineLink">{medicine.link}</p>
    
        </div>

        <button className="addMedicineBtn" onClick={() => addMedicineCard(medicine)}>

          {/* adds a plus sign to the button */}
          <div className="vertical"></div>

          <div className="horizontal"></div>

        </button>

    </div>
    

  )
}

export default Medicine