import APIRequest from "../APIRequest.js"
import React, { useRef } from "react";


function ChatbotBox() {

    let userInputRef = useRef(); // TODO: alter the code so it uses this 
    // TODO: add Ref for chatbotReplyField too maybe
   
    function handleUserInput(e) {
        e.preventDefault();
        console.log("hello!")

        // get the value of  user input field
        const userInput = document.getElementById("userinputfield").value;

        // save user input as json for later usage 
        const data = { userInput };

        APIRequest.sendUserInputToChatbot(data)
        .then((response) => {
            console.log("Chatbot Reply:", response);
            displayChatbotResponse(response.chatbotReply);
        });

    }

    function displayChatbotResponse(response) {
        var responseField = document.getElementById("chatbotreplyfield");
        responseField.textContent = response; 
    }

    return (
      <>
      <div className='chatbotbox'>
    
        <p>  Ask questions to HealthSiftAI here! </p>  

        <p className="chatbotReplyField" id="chatbotreplyfield"> </p>

        <form className="chatbotForm" onSubmit={handleUserInput}>
            <input className= "userInputField" type="textarea" id="userinputfield" ref={userInputRef} name="userinput" placeholder="Start chatting here..."></input>
            <button type="submit" className="chatbotButton">Submit</button> 
        </form>

      </div>
      </>
    )
  }
  
  export default ChatbotBox