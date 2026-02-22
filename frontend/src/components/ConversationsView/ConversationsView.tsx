import { useEffect, useState } from "react";
import FilterDropdown from "../FilterDropdown/FilterDropdown.tsx";
import { RESOLUTION_STATUS_FILTER_OPTIONS } from "../../constants/resolutionStatusOptions.ts";
import "./ConversationsView.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  conversationSelector,
  fetchConversations,
  // filteredConversations,
  // setResolutionStatusesFilter,
} from "../../slices/conversation/conversationSlice.ts";
import { MessageSquareOff } from "lucide-react";
import "../../styles/commonStyles/pagination.css";
import { RECORD_COUNT } from "../../constants/constants.ts";

const ConversationsView = () => {
  const [selectedResolutionStatus, setSelectedResolutionStatus] = useState(
    RESOLUTION_STATUS_FILTER_OPTIONS[0],
  );
  const [selectedRecordCount, setSelectedRecordCount] = useState(
    RECORD_COUNT[0],
  );
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, pagination, conversations } =
    useAppSelector(conversationSelector);
  // const conversations = useAppSelector(filteredConversations);
  console.log("selectedResolutionStatus:", selectedResolutionStatus);
  console.log("pagination:", pagination);
  useEffect(() => {
    dispatch(fetchConversations({ page }));
  }, [dispatch, page]);

  console.log("conversations in ConversationsView: ", conversations);
  return (
    <div className="conversations-view-wrapper">
      <div className="conversations-view-header">
        <FilterDropdown
          dropdownList={RESOLUTION_STATUS_FILTER_OPTIONS}
          selectedValue={selectedResolutionStatus}
          onSelect={(value: any) => {
            console.log("filter clicked", value);
            setSelectedResolutionStatus(value);
            // dispatch(setResolutionStatusesFilter(value));
            dispatch(fetchConversations({ resolution_status: value }));
          }}
        />
        <div className="conversations-record-count-filter">
          <FilterDropdown
            dropdownList={RECORD_COUNT}
            selectedValue={selectedRecordCount}
            onSelect={(value: any) => {
              console.log("filter clicked", value);
              setSelectedRecordCount(value);
              // dispatch(setResolutionStatusesFilter(value));
              dispatch(fetchConversations({ limit: value }));
            }}
            maxWidth="100px"
          />
        </div>
      </div>
      <div className="conversations-content-table-wrapper">
        {status === "loading" && (
          <div className="loading-conversations">Loading...</div>
        )}

        {status === "succeeded" &&
          conversations &&
          conversations?.length === 0 && (
            <div className="empty-conversations-table">
              <MessageSquareOff className="empty-conversations-icon" />
              <p>No Conversations Yet</p>
            </div>
          )}

        {status === "succeeded" &&
          conversations &&
          conversations?.length > 0 && (
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
                {conversations?.map((convo) => (
                  <tr
                    key={convo.id}
                    onClick={() => {
                      console.log("table row clicked", convo.id);
                      navigate(`/admin/conversations/${convo.id}`, {
                        state: {
                          user: convo.User.email_id,
                          last_msg_time: convo.formatted_last_messaged_at,
                        },
                      });
                    }}
                  >
                    <td>{convo.serial_id}</td>
                    <td>{convo?.User.email_id}</td>
                    <td>
                      <div
                        className={`resolution-status 
                      ${convo.resolution_status === "resolved" ? "resolved" : null} 
                      ${convo.resolution_status === "partially resolved" ? "partially-resolved" : null} 
                      ${convo.resolution_status === "unresolved" ? "unresolved" : null}`}
                      >
                        {convo.resolution_status
                          ? convo.resolution_status
                          : "-"}
                      </div>
                    </td>
                    <td>{convo.formatted_last_messaged_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      {status === "succeeded" && pagination.totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <p>
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ConversationsView;
