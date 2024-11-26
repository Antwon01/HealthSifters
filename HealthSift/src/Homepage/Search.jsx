import SearchBar from "./SearchBar.jsx"
import Medicine from "./Medicine.jsx";
import medicinePic from "../assets/allegraTest.jpg"

function Search() {

  // medicine object for testing purposes
  const medicine = {
    picture: medicinePic,
    title: "Allegra 120mg Tablet",
    brand: "Sanofi India Ltd",
    description: "Treatment of Sneezing and runny nose due to allergies. Treatment of Allergic conditions.",
    link:"CVS Link"
  }

  return (
    <div className='searchContainer'>

        <div className='searchBarContainer'>

          {/* display search bar on container */}
          <SearchBar/> 
            
        </div>

        <div className="medicineContainer">

          <Medicine medicine={medicine}/>
          
        </div>

    </div>
  )
}

export default Search;