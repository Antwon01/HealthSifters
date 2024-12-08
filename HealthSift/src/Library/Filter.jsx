import { useState }  from 'react'
import check from "../assets/check.svg";

function Filter({title = "", list}) {

    const [selected, setSelected] = useState(false);

    function handleSelect() {

      setSelected(prevState => !prevState);

      if(!selected){list((prevFilters) => [...prevFilters, title]);}
        
      if(selected){list((prevFilters) => prevFilters.filter((filter) => filter !== title))}
      
    }

    return (
        
        <li onClick={handleSelect}>   

            {title} 

            <img src={check} className={selected ? "libraryCheck" : "unvisible"}></img>

        </li>
  )
}

export default Filter