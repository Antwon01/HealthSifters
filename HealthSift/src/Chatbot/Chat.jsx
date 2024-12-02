import { useState } from 'react'
import ChatbotBox from '../Chatbot/Chatbot.jsx'
import ChatIcon from './ChatIcon.jsx';


function Chat() {

  const [displayChatbot, setDisplayChatbot] = useState(false);

  return (
    <>

        {/* display the chatbotbox if dipslay is true */}
        <ChatbotBox visibility={displayChatbot} setVisibility={setDisplayChatbot}/>

        {/* display the chatIcon whenever the chatbotbox visibility is false */}
        <ChatIcon setDisplay={setDisplayChatbot}/>

    </>
  )
}

export default Chat
