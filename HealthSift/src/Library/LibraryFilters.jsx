import Filter from "./Filter";
import APIRequest from "../APIRequest.js"
import { useEffect, useState } from 'react'

function LibraryFilters() {

  const [filters, setFilter] = useState([]);

  // useEffect(() => {

  //   const data = filters

  //   console.log(filters)

  //   APIRequest.libraryQuery(data)
  //   .then(response => console.log(response.status))

  // }, [filters])

  return (

    // create a list of fitlers
    <ul className='libraryFilters poppinsFont'>
      
      {/* add filters to the list */}
      <Filter title="Alphabetically" list={setFilter}/>

      <Filter title="Price" list={setFilter}/>

      <Filter title="Brand (ALPHA)" list={setFilter}/>

    </ul>
  )
}

export default LibraryFilters