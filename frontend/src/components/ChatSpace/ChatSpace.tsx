import { SendHorizonal } from "lucide-react";
// import EmojiPicker from "emoji-picker-react";

import "./ChatSpace.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addMessage, messageSelector } from "../../slices/message/messageSlice";
import {
  addUserMessage,
  conversationSelector,
  fetchConversation,
  startChatListener,
  // fetchConversation,
} from "../../slices/conversation/conversationSlice";
import { addUser, userSelector } from "../../slices/user/userSlice";
// import { connectWS } from "../../socketClient";
import ReactMarkdown from "react-markdown";

const ChatSpace = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [email, setEmail] = useState("");
  // const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  // let isEmail = false;

  const dispatch = useAppDispatch();
  const { currentConversationId } = useAppSelector(userSelector);
  const { currentConversation } = useAppSelector(conversationSelector);
  const { messageStatus } = useAppSelector(messageSelector);

  // const handleEmoji = (e: any) => {
  //   setInputText((prev) => prev + e.emoji);
  // };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dispatch, currentConversation]);

  useEffect(() => {
    dispatch(startChatListener());
  }, [dispatch]);

  useEffect(() => {
    console.log("inside userEffect");
    if (!currentConversationId) return;

    dispatch(fetchConversation({ id: currentConversationId }));
  }, [dispatch, currentConversationId]);

  // useEffect(() => {
  //   socket.current = connectWS();
  // }, []);

  const addUserHandler = async () => {
    console.log("clicked on add user button");
    await dispatch(addUser(email));
  };

  const addMessageHandler = () => {
    console.log("clicked on send button");
    if (!currentConversationId) return;
    dispatch(
      addMessage({
        text: inputText,
        sent_at: new Date(),
        conversationId: currentConversationId,
      }),
    );
    dispatch(addUserMessage({ text: inputText, sender: "user" }));
    setInputText("");
  };

  console.log("currentConversation: ", currentConversation);
  return (
    <>
      {!currentConversationId && (
        <div className="email-input-wrapper">
          <div className="email-input-container">
            <div className="email-input-title">
              <h3>Welcome to RespLoop.ai</h3>
              <p>Please enter your email for starting conversation.</p>
            </div>
            <div className="email-input-div">
              <input
                className="email-input"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="example@mail.com"
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addUserHandler();
                }}
              >
                <button className="login-user-form-button" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {currentConversationId && (
        <>
          <div className="ChatSpace-header">
            <div className="message-container">
              <p className="current-time">
                {currentConversation?.last_messaged_at}
              </p>
              <div className="ai-message-bubble">
                👋 Hi! I’m here to help. What can I assist you with today?
              </div>

              {currentConversation &&
                currentConversation.Messages &&
                currentConversation.Messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${message.sender === "ai" ? `ai-message-bubble` : null} 
              ${message.sender === "user" ? `user-message-bubble` : null}`}
                  >
                    <div>
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}

              <div ref={messagesEndRef} />
            </div>
            {messageStatus === "Sending" && (
              <div className="bot-typing">
                <p>typing...</p>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addMessageHandler();
              }}
            >
              <div className="message-input-container">
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
                  <button className="send-button" type="submit">
                    <SendHorizonal className="send-button-icon" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ChatSpace;

{
  /* <div
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
          </div> */
}
