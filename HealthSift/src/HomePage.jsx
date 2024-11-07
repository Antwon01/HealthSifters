import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";

function HomePage() {
  return (
    <div className='homePage'>

        {/* display navbar */}
        <Navbar/>

        {/* diplay search bar */}
        <Search/>


    </div>
  )
}

export default HomePage