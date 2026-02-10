// Types format for output of fetch all conversations
export interface Conversation {
  id: string;
  serial_id: string;
  last_messaged_at: Date | null;
  resolution_status: string;
  createdAt: Date;
  userId: string;
  formatted_last_messaged_at?: string;
  User: {
    email_id: string;
  };
}

// Slice state types
export interface ConversationState {
  conversations: Conversation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    resolution_statuses?: string;
  };
}
