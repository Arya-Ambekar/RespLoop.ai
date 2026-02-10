export interface User {
  id: string;
  email_id: string;
}

// Slice state types
export interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentUser: User | null;
}
