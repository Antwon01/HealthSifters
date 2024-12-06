import { useState } from 'react'
import LibraryFilters from './LibraryFilters';

function Filters() {

  return (

    // container were all the filter components will be displaed
    <div className='libraryFiltersContainer'>

      {/* diplay the title */}
      <div className="librarytitleContiner"> 
        
        <p className="libraryFilterTitle poppinsFont">Filters</p>

      </div>

      {/* display components */}
      <LibraryFilters/>

    </div>
  )
}

export default Filters