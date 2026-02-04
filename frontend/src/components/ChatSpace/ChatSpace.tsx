import { SendHorizonal, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

import "./ChatSpace.css";
import { useState } from "react";

const ChatSpace = () => {
  const [inputText, setInputText] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const handleEmoji = (e: any) => {
    setInputText((prev) => prev + e.emoji);
  };

  console.log(inputText);
  return (
    <div className="ChatSpace-header">
      <div className="message-container">
        <p className="current-time">Today, 10:15</p>
        <div className="ai-message-bubble">
          <p>please login for starting conversation.</p>
        </div>
        <div className="user-message-bubble">
          <p>please login for starting conversation.</p>
        </div>
      </div>
      <div className="message-input-container">
        <form
          className="message-input-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="message-input"
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            placeholder="Type your message..."
          />

          <div className="message-input-actions">
            <div
              className="emoji-picker-containter"
              onClick={(e) => e.stopPropagation()}
            >
              <Smile
                className="emoji-button-icon"
                onClick={() => setOpenEmojiPicker((prev) => !prev)}
              />
              <div className="emoji-picker">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={handleEmoji}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            </div>
            {/* <button
              className="document-button"
              onClick={(e) => e.stopPropagation()}
            >
              <Paperclip className="document-button-icon" />
            </button> */}
            <button
              className="send-button"
              onClick={(e) => {
                e.stopPropagation();
                setInputText("");
              }}
            >
              <SendHorizonal className="send-button-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSpace;
