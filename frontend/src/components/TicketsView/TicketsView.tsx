import { useEffect, useState } from "react";
import "./TicketsView.css";
import { TICKET_STATUS_FILTER_OPTIONS } from "../../constants/ticketStatusOptions";
import FilterDropdown from "../FilterDropdown/FilterDropdown.tsx";
// import { TICKETS_DUMMY_DATA } from "../../constants/ticketsViewDummyData.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  fetchTickets,
  filteredTickets,
  // setStatusesFilter,
  ticketSelector,
} from "../../slices/ticket/ticketSlice.ts";
import { MessageSquareOff } from "lucide-react";
import { useSelector } from "react-redux";
import { RECORD_COUNT } from "../../constants/constants.ts";

const TicketsView = () => {
  const [selectedTicketStatus, setSelectedTicketStatus] = useState(
    TICKET_STATUS_FILTER_OPTIONS[0],
  );
  const [selectedRecordCount, setSelectedRecordCount] = useState(
    RECORD_COUNT[0],
  );
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTickets({ page }));
  }, [dispatch, page]);

  const { status, pagination } = useAppSelector(ticketSelector);
  const tickets = useSelector(filteredTickets);

  return (
    <div className="tickets-view-wrapper">
      <div className="tickets-view-header">
        <FilterDropdown
          dropdownList={TICKET_STATUS_FILTER_OPTIONS}
          selectedValue={selectedTicketStatus}
          onSelect={(value: any) => {
            // console.log("filter clicked");
            setSelectedTicketStatus(value);
            // dispatch(setStatusesFilter(value));
            dispatch(fetchTickets({ status: value }));
          }}
        />
        <div className="tickets-record-count-filter">
          <FilterDropdown
            dropdownList={RECORD_COUNT}
            selectedValue={selectedRecordCount}
            onSelect={(value: any) => {
              // console.log("filter clicked", value);
              setSelectedRecordCount(value);
              // dispatch(setResolutionStatusesFilter(value));
              dispatch(fetchTickets({ limit: value }));
            }}
            maxWidth="100px"
          />
        </div>
      </div>
      <div className="tickets-content-table-wrapper">
        {status === "loading" && (
          <div className="loading-tickets">Loading...</div>
        )}

        {status === "succeeded" && tickets && tickets?.length === 0 && (
          <div className="empty-tickets-table">
            <MessageSquareOff className="empty-tickets-icon" />
            <p>No Conversations Yet</p>
          </div>
        )}

        {status === "succeeded" && tickets && tickets?.length > 0 && (
          <table className="tickets-view-table">
            <thead className="table-header">
              <tr>
                <th>Conversation Id</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {tickets.map((ticket) => {
                // console.log("ticket=> ", ticket);
                return (
                  <tr
                    key={ticket.id}
                    onClick={() => {
                      // console.log("table row clicked", ticket.id);
                      navigate(
                        `/admin/conversations/${ticket.conversationId}`,
                        {
                          state: {
                            user: ticket.Conversation.User?.email_id,
                          },
                        },
                      );
                    }}
                  >
                    <td>{ticket.Conversation.serial_id}</td>
                    <td>{ticket.reason}</td>
                    <td>
                      <div
                        className={`tickets-status 
                      ${ticket.status === "open" ? "open" : null} 
                      ${ticket.status === "closed" ? "closed" : null}`}
                      >
                        {ticket.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {status === "succeeded" && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage((p) => p - 1);
            }}
          >
            Prev
          </button>
          <p>
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <button
            disabled={page === pagination.totalPages}
            onClick={() => {
              setPage((p) => p + 1);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketsView;
