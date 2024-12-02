import APIRequest from "../APIRequest.js"
import sendMessage from "../assets/sendMessage.svg"
import React, { useRef, useState } from "react";


function ChatbotBox({visibility='false', setVisibility}) {

    let userInputRef = useRef();

    // this function grabs the user input, send it to the backend, and wait for AI Response
    function handleUserInput(e) {
        e.preventDefault();

        // get the value of  user input field
        const userInput = document.getElementById("userinputfield").value;

        // save user input as json for later usage 
        const data = { userInput };

        // call the chatbot
        APIRequest.sendUserInputToChatbot(data)
        .then((response) => {
          
            // diplay the chatbot response
            displayChatbotResponse(response.chatbotReply);
        });
    }

    // diplays the user response to the chatbox
    function displayUserResposnse() {

      // select the chatbox
      var chatbox = document.getElementById("chatbox");

      // create a new div
      var userResponse = document.createElement("div");
      
      const input = document.getElementById("userinputfield").value;

      // set the new div text content ot the user response
      userResponse.textContent = input;

      // add the CSS class for user response
      userResponse.classList.add("userResponse");

      // append user response to the chatbox
      chatbox.appendChild(userResponse);

    }
    
    // diplays the chatbot response to the chatbox
    function displayChatbotResponse(response) {
      
      // select the chatbox
      var chatbox = document.getElementById("chatbox");

      // create a new div
      var AIResponse = document.createElement('div');

      // set the new div text content to othe ai response
      AIResponse.textContent = response;

      // add the CSS class for ai response
      AIResponse.classList.add("aiResponse");

      // append the ai response to the chatbox
      chatbox.appendChild(AIResponse);

      AIResponse.scrollIntoView({behavior: "smooth", block: "start"});

      // reset the user input to empty
      document.getElementById("userinputfield").value = " ";

    }

    function handleClose() {
      // set the visibility to the opposite of what it currently is
      setVisibility(prevState => !prevState)
    }
    return (

      // if visibility is true display the chatbotbox else set it to unvisible
      <div className={visibility ? 'chatbotbox' : 'unvisible'}>
      
      {/* display the CLOSE tag. if the tag is clicked, we close the chatbot. */}
       <div className="chatbotCloseBtn poppinsFont" onClick={handleClose}> CLOSE </div>
      
      {/* container that will contain all the chatbot and user responses */}
        <p className="poppinsFont chatField" id="chatbox"></p>

      {/* form that handles the user input and the submit button */}
        <form className="chatbotForm" onSubmit={handleUserInput}>
           
           {/* text box where the user is going to type there request */}
            <input className="poppinsFont userInputField" type="textarea" id="userinputfield" ref={userInputRef} name="userinput" placeholder="Start chatting here..."></input>

            {/* button to submit the form */}
            <button type="submit" className="chatbotButton" onClick={() => displayUserResposnse()}>
              
              {/* send icon */}
              <img src={sendMessage} className="chatbotSendIcon"></img>
                          
              </button> 
              
        </form>

      </div>
    )
  }
  
  export default ChatbotBox