export interface LoginState {
  isLoggedIn: boolean | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
