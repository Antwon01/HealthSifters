import React from 'react'
import icon from '../assets/message.svg'

function ChatIcon({setDisplay}) {

    // sets the display to the opposite.
    function handleClick() {
        setDisplay(prevState => !prevState)
    }

    return (
        // diplay the container in which the chat icon will be displayed on
        <div className='chatbotIconContainer' onClick={() => handleClick()}>
            
            {/* diplay the icon for the chatbot */}
            <img className="chatbotIcon" src={icon}></img>
        
        </div>
    )
}

export default ChatIcon