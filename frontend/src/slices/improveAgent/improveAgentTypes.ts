export interface ImproveAgentData {
  serial_id: string;
  id: string;
  resolution_status: string;
  detected_reason: string;
  suggestions: string;
  approval_status: string;
}

export interface ImproveAgentState {
  improveAgentData: ImproveAgentData[];
  isImproveAgentModalOpen: boolean;
  filters: {
    improve_agent_statuses?: string;
  };
  currentImproveAgent: ImproveAgentData | null;
  searchQueries: {
    conversation_serial_id?: string;
  };
}
