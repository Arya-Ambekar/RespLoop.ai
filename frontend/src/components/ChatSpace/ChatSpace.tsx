import { SendHorizonal } from "lucide-react";
// import EmojiPicker from "emoji-picker-react";

import "./ChatSpace.css";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addMessage } from "../../slices/message/messageSlice";

const ChatSpace = () => {
  const [inputText, setInputText] = useState("");
  // const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  let isEmail = false;

  const dispatch = useAppDispatch();

  // const handleEmoji = (e: any) => {
  //   setInputText((prev) => prev + e.emoji);
  // };

  const addMessageHandler = (e: any) => {
    e.preventDefault();

    // check if inputText contains email. If yes then send "want to open new chat?" else dispatch addMessage()
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    isEmail = regex.test(inputText);

    dispatch(addMessage({ text: inputText, sent_at: new Date(), isEmail }));
    setInputText("");
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
        {isEmail && (
          <div className="decide-new-chat-option">
            <div className="ai-message-bubble">
              <p>Thank you! Would you like to start a new conversation?</p>
            </div>
            <div className="chat-buttons">
              <button
                className="chat-button"
                onClick={() => {
                  console.log("New chat opened");
                }}
              >
                New chat
              </button>
              <button
                className="chat-button"
                onClick={() => console.log("old chat opened")}
              >
                Continue this Chat
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="message-input-container">
        <form
          className="message-input-form"
          onSubmit={(e) => addMessageHandler(e)}
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
            {/* <div
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
            </div> */}
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
