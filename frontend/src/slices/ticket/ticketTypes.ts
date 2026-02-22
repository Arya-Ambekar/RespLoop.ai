// Types format for output of fetch all tickets
export interface Ticket {
  id: string;
  reason: string;
  status: string;
  conversationId: string;
  Conversation: {
    serial_id?: string;
    User?: {
      email_id?: string;
    };
  };
}

export interface TicketState {
  tickets: Ticket[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    statuses?: string;
  };
}
