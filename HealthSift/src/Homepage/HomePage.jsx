import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";
import Library from "../library/LibraryPage.jsx"
import ProfilePage from "../profile/ProfilePage.jsx";
import { Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <div className='homePage'>

        {/* display navbar */}
        <Navbar/>

        <Routes>

          <Route path="" element={<Search/>}/>

          <Route path="profile" element={<ProfilePage/>}/>

          <Route path="library" element={<Library/>}/>

        </Routes>

    </div>
  )
}

export default HomePage