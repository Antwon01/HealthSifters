import { useMedicineList } from "../library/MedicineCardContext.jsx"
import APIRequest from "../APIRequest.js"
function Medicine({medicine}) {

  const { addMedicineCard } = useMedicineList();

  function handleSubmit(e) {
    e.preventDefault();
    
    const data = {medicine}

    // get confimation from the backend and if the passsword is correct redirect to homepage.
    APIRequest.addMedicineToLibrary(data)
    .then(response => {
        
      const medicines = response.library // returns anrray of medicine objects
      
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

}

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

        <button className="addMedicineBtn" onClick={handleSubmit}>

          {/* adds a plus sign to the button */}
          <div className="vertical"></div>

          <div className="horizontal"></div>

        </button>

    </div>
    

  )
}

export default Medicine