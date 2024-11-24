function MedicineCard({index = 0, picSrc = "", title="", description="", brand="", link="", remove}) {
  return (

     <div className='libraryMedicineCard'>

        <img className="cardPicture" src={picSrc} alt="Profile Picture"/>

        <div className="poppinsFont cardInformation">

            {/* name of medicine */}
            <p className="medicineTittle">{title}</p>

            <button className="cardRemoveBtn poppoinsFont" onClick={() => remove(index)}> Remove </button>

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