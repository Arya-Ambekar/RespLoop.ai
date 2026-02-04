import { Minus } from "lucide-react";
import type { ChatBoxHeaderProps } from "./ChatBoxHeader.ts";
import "./ChatBoxHeader.css";
import botIconImg from "../../assets/chatboticonimg.png";

const ChatBoxHeader = ({ onClose }: ChatBoxHeaderProps) => {
  return (
    <div className="chatbox-header">
      <div className="chatbot-icon-wrapper">
        <img className="chatbot-icon-img" src={botIconImg} />
        <div className="chatbot-info">
          <h4>RespLoop.ai</h4>
          <p>Ask me about the queries that you have</p>
        </div>
      </div>
      <button className="close-chatbox" onClick={onClose}>
        <Minus className="minus-icon" />
      </button>
    </div>
  );
};

export default ChatBoxHeader;
