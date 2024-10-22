import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";

function HomePage() {
  return (
    <div className='homePage'>

        <Navbar/>
        {/* search bar */}
        
        <Search/>

        {/* ai button */}
    </div>
  )
}

export default HomePage