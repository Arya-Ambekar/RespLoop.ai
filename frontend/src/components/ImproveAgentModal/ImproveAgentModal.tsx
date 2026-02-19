import { X } from "lucide-react";
import DialogBox from "../DialogBox/DialogBox.tsx";
import type { ImproveAgentModalProps } from "./ImproveAgentModal.ts";
import "./ImproveAgentModal.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  improveAgentSelector,
  setApprovalStatus,
} from "../../slices/improveAgent/improveAgentSlice.ts";

const ImproveAgentModal = ({ isOpen, onClose }: ImproveAgentModalProps) => {
  const { currentImproveAgent } = useAppSelector(improveAgentSelector);
  const dispatch = useAppDispatch();

  const HandleRejectButton = () => {
    dispatch(
      setApprovalStatus({
        approval_status: "Rejected",
        id: currentImproveAgent?.id,
      }),
    );
    onClose();
  };

  const HandleApproveButton = () => {
    dispatch(
      setApprovalStatus({
        approval_status: "Approved",
        id: currentImproveAgent?.id,
      }),
    );
    onClose();
  };

  return (
    <DialogBox
      isOpen={isOpen}
      onClose={onClose}
      minHeight="460px"
      minWidth="550px"
    >
      <div className="improve-agent-modal-close-button-wrapper">
        <button className="modal-close-button" onClick={onClose}>
          <X className="modal-close-button-icon" />
        </button>
      </div>
      {currentImproveAgent && (
        <>
          <div className="title-wrapper">
            <h3>{currentImproveAgent.serial_id}</h3>
          </div>
          <div className="improve-agent-modal-body">
            <div className="reason-wrapper">
              <p className="reason-title">Reason</p>
              <p className="reason-data">
                {currentImproveAgent.detected_reason}
              </p>
            </div>
            <div className="solution-wrapper">
              <p className="solution-title">Solution</p>
              <p className="solution-data">{currentImproveAgent.suggestions}</p>
            </div>
          </div>

          {
            // currentImproveAgent.approval_status === "Approved" ||
            !currentImproveAgent.approval_status && (
              <div className="improve-agent-modal-button-wrapper">
                <button className="reject-button" onClick={HandleRejectButton}>
                  Reject
                </button>
                <button
                  className="approve-button"
                  onClick={HandleApproveButton}
                >
                  Approve
                </button>
              </div>
            )
          }
        </>
      )}
    </DialogBox>
  );
};

export default ImproveAgentModal;
