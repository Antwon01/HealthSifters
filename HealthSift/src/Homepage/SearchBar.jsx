import filterIcon from '../assets/filter-svgrepo-com.svg'
import APIRequest from "../APIRequest.js"
import { useState, useEffect, useRef } from 'react'
import Filters from './Filters.jsx';

function SearchBar() {
  
  const [search, setSearchVal] = useState("");
  // takes care of diplying the filter list
  const [filterActivate, setFilter] = useState(false);
  // holds the filters in a list
  const [filters, setFilters] = useState([]);

  let filterRef  = useRef();
  let iconRef  = useRef();

  // This function makes the list of filters visible when the icon is clicked.
  function handleFilter() {
    if (!filterActivate) {setFilter(prevState => !prevState)};
  }

  function addFilter(e) {
    // adds the filter to the filterlist, but it checks before hand if the filters is already in the list
    // if the filter is already in the list we dont add it.
    if (!filters.includes(e.target.textContent)) {
      setFilters([...filters, e.target.textContent]);
    }

  }

  function removeFilter(index) {
    // if the users clicks on a filter, this function removes the filter from the list
    setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));

  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const data = {search, filters}

    APIRequest.searchQuery(data)
    .then(response => console.log(response.status))
  }

  // Closes the filter list when the user clicks out side. 
  useEffect(() => {
    let handler = (e) => {
      // checks if where the user clicks in inside the list of filters.
      if(!filterRef.current.contains(e.target) && !iconRef.current.contains(e.target)) {
        setFilter(false);
      }
    }

    // if the the mouse is pressed down, we call handler
    document.addEventListener("mousedown", handler);

    // we remove the event handler to avoid any problems
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
        <>

          <form className='searchForm' onSubmit={handleSubmit}>
            
            {/* adds a search bar */}
            <input className="searchBar poppinsFont" type="text" placeholder='Search' onChange={(e) => setSearchVal(e.target.value)}/>
            
            <Filters filterList={filters} removeFilter={removeFilter}/>
            
            {/* container for the filter */}
            <div className='searchBarFilter'>

              {/* filter icon */}
                <img src={filterIcon} onClick={handleFilter} ref={iconRef}></img>

                {/* list of filters. If filterActivate is true, we make the list visible else unvisible */}
                <ul className={filterActivate ? 'searchBarOptions poppinsFont' : 'unvisible searchBarOptions poppinsFont'} ref={filterRef}>

                  <li onClick={(e) => addFilter(e)}> Brand </li>
                  <li onClick={(e) => addFilter(e)}> Quantity  </li>
                  <li onClick={(e) => addFilter(e)}> Name </li>
                  <li onClick={(e) => addFilter(e)}> Quality  </li>
                  <li onClick={(e) => addFilter(e)}> Illnesses </li>
                  <li onClick={(e) => addFilter(e)}> Location  </li>

                </ul>

            </div>

            {/* search button for the search bar */}
            <button className="poppinsFont searchBarBtn" type="submit">Search</button>
 
          </form>
 
        </>

    )
}

export default SearchBar