import { SendHorizonal, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

import "./ChatSpace.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addMessage, messageSelector } from "../../slices/message/messageSlice";
import { conversationSelector } from "../../slices/conversation/conversationSlice";

const ChatSpace = () => {
  const [inputText, setInputText] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  let isEmail = false;

  const dispatch = useAppDispatch();
  const { currentConversationId } = useAppSelector(messageSelector);
  const { currentConversation } = useAppSelector(conversationSelector);
  console.log("currentConversationId: ", currentConversationId);
  console.log("currentConversation: ", currentConversation);
  const handleEmoji = (e: any) => {
    setInputText((prev) => prev + e.emoji);
  };

  const addMessageHandler = () => {
    console.log("handler called", currentConversationId);
    if (!currentConversationId) return;
    // e.preventDefault();

    // check if inputText contains email. If yes then send "want to open new chat?" else dispatch addMessage()
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    isEmail = regex.test(inputText);
    console.log("isEmail in addMessageHandler: ", isEmail);
    dispatch(
      addMessage({
        text: inputText,
        sent_at: new Date(),
        isEmail,
        conversationId: currentConversationId,
      }),
    );
    setInputText("");
  };

  // const addMessageHandler = (e: any) => {
  //   console.log("handler called", currentConversationId);
  //   if (!currentConversationId) return;
  //   e.preventDefault();

  //   // check if inputText contains email. If yes then send "want to open new chat?" else dispatch addMessage()
  //   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   isEmail = regex.test(inputText);
  //   console.log("isEmail in addMessageHandler: ", isEmail);
  //   dispatch(
  //     addMessage({
  //       text: inputText,
  //       sent_at: new Date(),
  //       isEmail,
  //       conversationId: currentConversationId,
  //     }),
  //   );
  //   setInputText("");
  // };

  // console.log(inputText);
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
        {/* <form className="message-input-form" onSubmit={addMessageHandler}> */}
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
            // onClick={(e) => e.stopPropagation()}
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

          <button
            className="send-button"
            type="submit"
            onClick={addMessageHandler}
          >
            <SendHorizonal className="send-button-icon" />
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ChatSpace;

{
  /* {isEmail && (
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
        )} */
}

{
  /* <button
              className="document-button"
              onClick={(e) => e.stopPropagation()}
            >
              <Paperclip className="document-button-icon" />
            </button> */
}
