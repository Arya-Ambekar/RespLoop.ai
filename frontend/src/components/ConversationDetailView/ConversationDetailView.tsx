import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();

  const { state } = location;
  // console.log("state in ConversationDetailView: ", state);
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(messageSelector);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessages(id));
  }, [dispatch, id]);

  // console.log("state: ", state);
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
            <div className="user-mail">{state.user}</div>
            {/* <div className="time">{state.last_msg_time}</div> */}
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
