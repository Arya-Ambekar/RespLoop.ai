import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./ConversationDetailView.css";

const ConversationDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

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
          <div className="details-view-ai-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-user-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-ai-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-user-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-ai-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-user-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-ai-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-user-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
          <div className="details-view-ai-message-bubble">
            <p>Hi there, please login for starting conversation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailView;
