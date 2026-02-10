// Types format for output of get all api of messages
export interface Message {
  id: string;
  text: string;
  sender: string;
  sent_at: string;
  conversationId: string;
  createdAt: Date;
}

// Slice state types
export interface MessageState {
  messages: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// create message return type
export interface createMessage {
  userMessage: string;
  botMessage: string;
}
