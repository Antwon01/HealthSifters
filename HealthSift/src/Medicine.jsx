import profilePic from "./assets/fakepi.png"

function Medicine() {
  return (

    <div className="medicineCard">

        {/* display the image of the medicine */}
        <img className="medicinePicture" src={profilePic} alt="Profile Picture"/>

        {/* holds all related information of the medicine. */}
        <div className="poppinsFont medicineInformation">

            {/* name of medicine */}
            <p className="medicineTittle">Allegra 120mg Tablet</p>

            {/* brand of medicine */}
            <p className="medicineBrand"><em>Sanofi India Ltd</em></p>
            
            {/* description of the medicine */}
            <p>Treatment of Sneezing and runny nose due to allergiesTreatment of Allergic conditions</p>

            {/* medicine link */}
            <p className="medicineLink">CVS Link</p>
    
        </div>

        <button className="addMedicineBtn">

          {/* adds a plus sign to the button */}
          <div className="vertical"></div>

          <div className="horizontal"></div>

        </button>

    </div>
    

  )
}

export default Medicine