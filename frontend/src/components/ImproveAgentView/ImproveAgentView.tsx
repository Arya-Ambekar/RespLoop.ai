import { useState } from "react";
import { IMPROVE_AGENT_RESOLUTION_STATUS_FILTER_OPTIONS } from "../../constants/resolutionStatusOptions";
import FilterDropdown from "../FilterDropdown/FilterDropdown.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./ImproveAgentView.css";
// import { DUMMY_IMPROVE_AGENT_DATA } from "../../constants/improveAgentViewDummyData.ts";
import ImproveAgentModal from "../ImproveAgentModal/ImproveAgentModal.tsx";
import {
  filteredImproveAgentData,
  setCurrentImproveAgent,
  setImproveAgentStatusesFilter,
} from "../../slices/improveAgent/improveAgentSlice.ts";

const ImproveAgentView = () => {
  const [
    selectedImproveAgentResolutionStatus,
    setSelectedImproveAgentResolutionStatus,
  ] = useState(IMPROVE_AGENT_RESOLUTION_STATUS_FILTER_OPTIONS[0]);
  const [isImproveAgentModalOpen, setIsImproveAgentModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const improveAgentData = useAppSelector(filteredImproveAgentData);

  const closeImproveModal = () => {
    setIsImproveAgentModalOpen(false);
  };

  return (
    <div className="improve-agent-view-wrapper">
      <FilterDropdown
        dropdownList={IMPROVE_AGENT_RESOLUTION_STATUS_FILTER_OPTIONS}
        selectedValue={selectedImproveAgentResolutionStatus}
        onSelect={(value: any) => {
          setSelectedImproveAgentResolutionStatus(value);
          dispatch(setImproveAgentStatusesFilter(value));
        }}
      />
      <div className="improve-agent-content-table-wrapper">
        {improveAgentData && improveAgentData?.length > 0 && (
          <table className="improve-agent-view-table">
            <thead className="improve-agent-table-header">
              <tr>
                <th>Conversation Id</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="improve-agent-table-body">
              {improveAgentData?.map((improveAgent) => (
                <tr key={improveAgent.id}>
                  <td>{improveAgent.serial_id}</td>
                  <td>{improveAgent?.detected_reason}</td>
                  <td>
                    <div
                      className={`resolution-status 
                      ${improveAgent.resolution_status === "partially resolved" ? "partially-resolved" : null} 
                      ${improveAgent.resolution_status === "unresolved" ? "unresolved" : null}`}
                    >
                      {improveAgent.resolution_status
                        ? improveAgent.resolution_status
                        : "-"}
                    </div>
                  </td>
                  <td>
                    <button
                      className="improve-button"
                      onClick={() => {
                        setIsImproveAgentModalOpen(true);
                        dispatch(setCurrentImproveAgent(improveAgent.id));
                      }}
                    >
                      {improveAgent?.approval_status === ""
                        ? "Improve"
                        : improveAgent?.approval_status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ImproveAgentModal
        isOpen={isImproveAgentModalOpen}
        onClose={closeImproveModal}
      />
    </div>
  );
};

export default ImproveAgentView;
