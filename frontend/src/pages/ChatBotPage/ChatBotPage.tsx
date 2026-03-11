import { useState } from "react";
import botImg from "../../assets/ezgif-15214f110b5f7f84.webp";
import "./ChatBotPage.css";
import ChatBox from "../../components/ChatBox/ChatBox.tsx";
import { Link } from "react-router-dom";

const ChatBotPage = () => {
  const [isChatbotButtonVisible, setIsChatbotButtonVisible] = useState(true);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

  return (
    <>
      {isChatbotButtonVisible && (
        <>
          <div className="instruction">
            <p>Click on below chatbot button</p>
          </div>
        </>
      )}
      <div className="chatbot-wrapper">
        <Link to={"/login"}>
          <button className="admin-login-button">Login</button>
        </Link>
        <div className="chatbot-area">
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
        </div>
      </div>
    </>
  );
};

export default ChatBotPage;
