import React from 'react'
import filter from './assets/filter-svgrepo-com.svg'
import { useState, useEffect, useRef } from 'react'

function SearchBar() {

  const [filterActivate, setFilter] = useState(false);
  let filterRef  = useRef();
  let iconRef  = useRef();

  // This function makes the list of filters visible when the icon is clicked.
  function handleFilter() {
    if (!filterActivate) {setFilter(prevState => !prevState)};
  }

  // Closes the filter list when the user clicks out side. 
  useEffect(() => {
    let handler = (e) => {
      if(!filterRef.current.contains(e.target) && !iconRef.current.contains(e.target)) {
        setFilter(false);
        console.log(filterRef.current);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
        <>
        
          {/* adds a search bar */}
          <input className="searchBar poppinsFont" type="text" placeholder='Search'/>
          
          {/* container for the filter */}
          <div className='searchBarFilter'>

            {/* filter icon */}
              <img src={filter} onClick={handleFilter} ref={iconRef}></img>

              {/* list of filters. If filterActivate is true, we make the list visible else unvisible */}
              <ul className={filterActivate ? 'searchBarOptions poppinsFont' : 'unvisible searchBarOptions poppinsFont'} ref={filterRef}>

                <li> Brand </li>
                <li> Quantity  </li>
                <li> Name </li>
                <li> Quality  </li>
                <li> Illnesses </li>
                <li> Location  </li>

              </ul>

          </div>

          {/* search button for the search bar */}
          <button className="poppinsFont searchBarBtn" type="">Search</button>
    
        </>

    )
}

export default SearchBar