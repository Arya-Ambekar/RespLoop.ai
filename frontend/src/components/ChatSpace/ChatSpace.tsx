import { SendHorizonal } from "lucide-react";

import "./ChatSpace.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addMessage, messageSelector } from "../../slices/message/messageSlice";
import {
  addUserMessage,
  conversationSelector,
  createConversation,
  fetchConversation,
  startChatListener,
} from "../../slices/conversation/conversationSlice";
import {
  addUser,
  hydrateUserFromLocalStorage,
  setCurrentConversationId,
  userSelector,
} from "../../slices/user/userSlice";
import ReactMarkdown from "react-markdown";

const ChatSpace = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [inputText, setInputText] = useState("");
  const [email, setEmail] = useState("");

  // Mutable flag that persists across renders.
  // We use useRef instead of useState because:
  // - We only need to remember this value
  // - We do NOT want changes to trigger a re-render
  // This prevents the chat options from appearing again
  // after the user has already made a choice.
  const hasChosenRef = useRef(false);
  const [showOptions, setShowOptions] = useState(false);

  const dispatch = useAppDispatch();
  let { currentConversationId, currentUser } = useAppSelector(userSelector);
  const { currentConversation } = useAppSelector(conversationSelector);
  const { messageStatus } = useAppSelector(messageSelector);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedConvoId = localStorage.getItem("convo_id");

    if (storedUser && storedConvoId) {
      dispatch(
        hydrateUserFromLocalStorage({
          user: JSON.parse(storedUser),
          conversationId: storedConvoId,
        }),
      );
      dispatch(fetchConversation({ id: storedConvoId }));

      // Only show the Continue / New Chat options
      // if the user has NOT already chosen in this session.
      // If they already picked once, we skip showing it again.
      if (!hasChosenRef.current) {
        setShowOptions(true);
      }
    }
  }, [dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation]);

  useEffect(() => {
    dispatch(startChatListener());
  }, [dispatch]);

  const addUserHandler = async () => {
    console.log("clicked on add user button");
    if (!email) return;

    const result = await dispatch(addUser(email));

    if (result.payload) {
      const user = {
        id: result.payload.user.id,
        email_id: result.payload.user.email_id,
      };

      const convoId = result.payload.conversation.id;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("convo_id", convoId);

      dispatch(fetchConversation({ id: convoId }));
    }
  };

  const addMessageHandler = () => {
    console.log("clicked on send button");
    if (!inputText || !currentConversationId) return;
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

  const handleCreateNewChat = async () => {
    if (!currentUser?.id) return;

    const result = await dispatch(createConversation(currentUser.id));

    if (result.payload?.id) {
      localStorage.setItem("convo_id", result.payload.id);
      dispatch(setCurrentConversationId(result.payload.id));
      dispatch(fetchConversation({ id: result.payload.id }));

      setShowOptions(false);

      // Mark that the user has made a choice.
      // This ensures the options won't show again
      // even if the component re-renders.
      hasChosenRef.current = true;
    }
  };

  const handleContinueOldChat = () => {
    setShowOptions(false);

    // Mark that the user has made a choice.
    // This ensures the options won't show again
    // even if the component re-renders.
    hasChosenRef.current = true;
  };

  if (!currentUser) {
    return (
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
    );
  }

  console.log("currentConversation: ", currentConversation);
  return (
    <div className="ChatSpace-header">
      <div className="message-container">
        <p className="current-time">{currentConversation?.last_messaged_at}</p>
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
        {showOptions && (
          <div className="new-chat-button">
            <button onClick={handleContinueOldChat}>Continue</button>
            <button onClick={handleCreateNewChat}>New Chat</button>
          </div>
        )}
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
  );
};

export default ChatSpace;

{
  // const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  // let isEmail = false;
  // const handleEmoji = (e: any) => {
  //   setInputText((prev) => prev + e.emoji);
  // };
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
