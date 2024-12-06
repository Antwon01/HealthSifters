import FavoriteMedicine from "./FavoriteMedicine"
import Filters from "./FilterContainer"


function LibraryPage() {
  return (

    // This container represents the entire library page.
    <div className="libraryPage">
      
      {/* this is the container within the page */}
      <div className="libraryContainer"> 

        {/* display the medicines that were bookmarked by the user */}
        <FavoriteMedicine/>
        
        {/* displat filters */}
        <Filters/>

      </div>
      
    </div>
  )
}

export default LibraryPage