import React from 'react'

function Filters(props) {

  return (
    
    <div className='activatedFiltersContainer'> 

        {/* it loops throught the filter list and maps it to the div. */}
        {props.filterList.map((filter, index) =>
            
            // if the filter is clicked, it will call remove filter which will remove the filter from the the displayed list.
            <div className='activatedFilter poppinsFont' key={index} onClick={() => props.removeFilter(index)}>
                {filter}
            </div>              

        )}

    </div>

  )
}

export default Filters