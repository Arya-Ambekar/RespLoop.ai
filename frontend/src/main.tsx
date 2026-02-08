import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
// import App from "./App.tsx";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";
import ConversationsView from "./components/ConversationsView/ConversationsView.tsx";
import TicketsView from "./components/TicketsView/TicketsView.tsx";
import ConversationDetailView from "./components/ConversationDetailView/ConversationDetailView.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ChatBotPage />}></Route>,
      <Route path="admin" element={<AdminPanelPage />}>
        <Route path="conversations" element={<ConversationsView />} />
        <Route path="conversations/:id" element={<ConversationDetailView />} />
        <Route path="tickets" element={<TicketsView />} />
        <Route path="tickets/:id" element={<ConversationDetailView />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
