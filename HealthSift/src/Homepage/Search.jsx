import SearchBar from "./SearchBar.jsx"
import Medicine from "./Medicine.jsx";
import Chat from "../chatbot/Chat.jsx"
import medicinePic from "../assets/allegraTest.jpg"
import { useState } from "react";

function Search() {

  const [list, setList] = useState([]); // list to store the medicines we looked up


  return (
    <div className='searchContainer'>

        <div className='searchBarContainer'>

          {/* display search bar on container */}
          <SearchBar updateList={setList}/> 
            
        </div>

        <div className="medicineContainer">
          
          {list.map((medicine, index) => (

            <Medicine key={index} medicine={medicine}/>

          ))}
          
        </div>

        <Chat/>

    </div>
  )
}

export default Search;