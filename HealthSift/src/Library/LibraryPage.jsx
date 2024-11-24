import FavoriteMedicine from "./FavoriteMedicine"
import Filters from "./Filters"


function LibraryPage() {
  return (
    <div className="libraryPage">

      <div className="libraryContainer"> 

        <FavoriteMedicine/>
        
        <Filters/>

      </div>
      
    </div>
  )
}

export default LibraryPage