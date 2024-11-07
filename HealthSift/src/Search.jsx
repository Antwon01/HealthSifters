import SearchBar from "./SearchBar.jsx"
import Medicine from "./Medicine.jsx";

function Search() {
  return (
    <div className='searchContainer'>

        <div className='searchBarContainer'>

          {/* display search bar on container */}
          <SearchBar/> 
            
        </div>

        <div className="medicineContainer">

          <Medicine/>
          
        </div>

    </div>
  )
}

export default Search;