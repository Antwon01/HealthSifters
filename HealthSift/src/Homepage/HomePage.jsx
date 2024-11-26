import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";
import Library from "../Library/LibraryPage.jsx"
import ProfilePage from "../Profile/ProfilePage.jsx";
import { Route, Routes } from "react-router-dom";
import ChatbotBox from "../Chatbot/Chatbot.jsx"

function HomePage() {
  return (
    <div className='homePage'>

        {/* display navbar */}
        <Navbar/>

        <ChatbotBox/>

        <Routes>

          <Route path="" element={<Search/>}/>

          <Route path="profile" element={<ProfilePage/>}/>

          <Route path="library" element={<Library/>}/>

        </Routes>

    </div>

    
  )
}

export default HomePage