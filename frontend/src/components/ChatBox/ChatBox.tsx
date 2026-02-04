import type { ChatBoxProps } from "./ChatBox.ts";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader.tsx";
import ChatSpace from "../ChatSpace/ChatSpace.tsx";
import "./ChatBox.css";

const ChatBox = ({ isOpen, onClose }: ChatBoxProps) => {
  if (!isOpen) return null;

  return (
    <div className="ChatBox-wrapper">
      <ChatBoxHeader onClose={onClose} />
      <div className="chat-space">
        <ChatSpace />
      </div>
    </div>
  );
};

export default ChatBox;
