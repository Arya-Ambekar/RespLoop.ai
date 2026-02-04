import { useState } from "react";
import botImg from "../assets/ezgif-15214f110b5f7f84.webp";
import "./ChatBotPage.css";
import ChatBox from "../components/ChatBox/ChatBox.tsx";

const ChatBotPage = () => {
  const [isChatbotButtonVisible, setIsChatbotButtonVisible] = useState(true);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

  return (
    <div className="chatbot-wrapper">
      {isChatbotButtonVisible && (
        <button
          className="chatbot-button"
          onClick={() => {
            setIsChatbotButtonVisible(false);
            setIsChatBoxOpen(true);
          }}
        >
          <img className="chatbot-icon" src={botImg} alt="Chatbot" />
        </button>
      )}
      {isChatBoxOpen && (
        <div className="chatbot-slot">
          <ChatBox
            isOpen
            onClose={() => {
              setIsChatBoxOpen(false);
              setIsChatbotButtonVisible(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBotPage;
