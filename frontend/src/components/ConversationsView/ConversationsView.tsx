import { useState } from "react";
import FilterDropdown from "../FilterDropdown/FilterDropdown.tsx";
import { RESOLUTION_STATUS_FILTER_OPTIONS } from "../../constants/resolutionStatusOptions.ts";
import "./ConversationsView.css";
import { DUMMY_CONVERSATIONS } from "../../constants/conversationsViewDummyData.ts";
import { useNavigate } from "react-router-dom";

const ConversationsView = () => {
  const [selectedResolutionStatus, setSelectedResolutionStatus] = useState(
    RESOLUTION_STATUS_FILTER_OPTIONS[0],
  );

  const navigate = useNavigate();

  return (
    <div className="conversations-view-wrapper">
      <FilterDropdown
        dropdownList={RESOLUTION_STATUS_FILTER_OPTIONS}
        selectedValue={selectedResolutionStatus}
        onSelect={(value: string) => {
          console.log("filter clicked");
          setSelectedResolutionStatus(value);
        }}
      />
      <div className="conversations-content-table-wrapper">
        <table className="conversations-view-table">
          <thead className="table-header">
            <tr>
              <th>Conversation Id</th>
              <th>User email</th>
              <th>Status</th>
              <th>Last messaged at</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {DUMMY_CONVERSATIONS.map((convo) => (
              <tr
                key={convo.id}
                onClick={() => {
                  console.log("table row clicked", convo.id);
                  navigate(`/admin/conversations/${convo.id}`);
                }}
              >
                <td>{convo.serial_id}</td>
                <td>{convo.email_id}</td>
                <td>
                  <div
                    className={`resolution-status 
                      ${convo.status === "Resolved" ? "resolved" : null} 
                      ${convo.status === "Partially resolved" ? "partially-resolved" : null} 
                      ${convo.status === "Unresolved" ? "unresolved" : null}`}
                  >
                    {convo.status}
                  </div>
                </td>
                <td>{convo.last_messaged_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => console.log("prev button clicked")}>Prev</button>
        <p>Page 1 of 5</p>
        <button onClick={() => console.log("next button clicked")}>Next</button>
      </div>
    </div>
  );
};

export default ConversationsView;
