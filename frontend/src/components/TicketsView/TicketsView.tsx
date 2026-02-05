import { useState } from "react";
import "./TicketsView.css";
import { TICKET_STATUS_FILTER_OPTIONS } from "../../constants/ticketStatusOptions";
import FilterDropdown from "../FilterDropdown/FilterDropdown.tsx";
import { TICKETS_DUMMY_DATA } from "../../constants/ticketsViewDummyData.ts";

const TicketsView = () => {
  const [selectedTicketStatus, setSelectedTicketStatus] = useState(
    TICKET_STATUS_FILTER_OPTIONS[0],
  );

  return (
    <div className="tickets-view-wrapper">
      <FilterDropdown
        dropdownList={TICKET_STATUS_FILTER_OPTIONS}
        selectedValue={selectedTicketStatus}
        onSelect={(value: string) => {
          console.log("filter clicked");
          setSelectedTicketStatus(value);
        }}
      />
      <div className="tickets-content-table-wrapper">
        <table className="tickets-view-table">
          <thead className="table-header">
            <tr>
              <th>Conversation Id</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {TICKETS_DUMMY_DATA.map((ticket) => [
              <tr
                key={ticket.id}
                onClick={() => console.log("table row clicked", ticket.id)}
              >
                <td>{ticket.serial_id}</td>
                <td>{ticket.reason}</td>
                <td>
                  <div
                    className={`tickets-status 
                      ${ticket.status === "Open" ? "open" : null} 
                      ${ticket.status === "Closed" ? "closed" : null}`}
                  >
                    {ticket.status}
                  </div>
                </td>
              </tr>,
            ])}
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

export default TicketsView;
