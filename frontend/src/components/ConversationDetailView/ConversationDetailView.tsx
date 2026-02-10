import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./ConversationDetailView.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMessages,
  messageSelector,
} from "../../slices/message/messageSlice";
import { useEffect } from "react";

const ConversationDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(messageSelector);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessages(id));
  }, [dispatch, id]);

  return (
    <div className="conversation-detail-view">
      <button className="back-button-wrapper" onClick={() => navigate(-1)}>
        <ArrowLeft className="back-button" />
        Back
      </button>
      <div className="conversation-window-wrapper">
        <div className="user-info-header">
          <div className="profile-picture">A</div>
          <div className="user-info">
            <div className="user-mail">alanwalker@abc.com</div>
            <div className="time">Today, 22:14</div>
          </div>
        </div>
        <div className="conversation-window">
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`details-view-message-bubble
                ${message.sender === "ai" ? "details-view-ai-message-bubble" : "details-view-user-message-bubble"}`}
              >
                <p>{message.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailView;
