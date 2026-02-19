export const DUMMY_IMPROVE_AGENT_DATA = [
  {
    serial_id: "CONVO-002",
    id: "550e8400-e29b-41d4-a716-446655440001",
    // failure_type: "REPEAT_QUESTION",
    resolution_status: "partially resolved",
    detected_reason:
      "User asked similar question multiple times before resolution.",
    suggestions: "Improve response clarity with step-by-step explanations.",
    approval_status: "",
  },
  {
    serial_id: "CONVO-003",
    id: "550e8400-e29b-41d4-a716-446655440002",
    // failure_type: "KNOWLEDGE_GAP_ESCALATION",
    resolution_status: "unresolved",
    detected_reason: "Ticket created due to AI inability to answer the query.",
    suggestions: "Expand the knowledge base for this topic.",
    approval_status: "",
  },
  {
    serial_id: "CONVO-004",
    id: "550e8400-e29b-41d4-a716-446655440003",
    // failure_type: "POLICY_QUERY_ESCALATION",
    resolution_status: "unresolved",
    detected_reason:
      "Policy-related question resulted in automatic ticket creation.",
    suggestions:
      "Integrate official policy documentation into the knowledge base.",
    approval_status: "",
  },
  {
    serial_id: "CONVO-005",
    id: "550e8400-e29b-41d4-a716-446655440004",
    // failure_type: "LONG_UNRESOLVED_CONVERSATION",
    resolution_status: "partially resolved",
    detected_reason: "Extended conversation ended without clear resolution.",
    suggestions: "Break complex responses into structured steps.",
    approval_status: "",
  },
];
