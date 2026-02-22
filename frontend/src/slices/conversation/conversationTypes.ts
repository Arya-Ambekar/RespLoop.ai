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

// Types format for output of fetch by id conversations
export interface currentConversation {
  id?: string;
  serial_id?: string;
  last_messaged_at?: string;
  resolution_status?: string;
  createdAt?: Date;
  userId?: string;
  Messages: {
    id?: string;
    text: string;
    sender: string;
  }[];
}

// Slice state types
export interface ConversationState {
  conversations: Conversation[];
  currentConversation: currentConversation | null;
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
