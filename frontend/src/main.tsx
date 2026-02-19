import { createRoot } from "react-dom/client";
// import { StrictMode } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";
import ConversationsView from "./components/ConversationsView/ConversationsView.tsx";
import TicketsView from "./components/TicketsView/TicketsView.tsx";
import ConversationDetailView from "./components/ConversationDetailView/ConversationDetailView.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import SocketClient from "./socketClient.ts";
import ImproveAgentView from "./components/ImproveAgentView/ImproveAgentView.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";

export const socketClient = new SocketClient();

console.log("socketClient: ", socketClient);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ChatBotPage />}></Route>,
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="admin" element={<AdminPanelPage />}>
        <Route path="conversations" element={<ConversationsView />} />
        <Route path="conversations/:id" element={<ConversationDetailView />} />
        <Route path="tickets" element={<TicketsView />} />
        <Route path="tickets/:id" element={<ConversationDetailView />} />
        <Route path="improveagent" element={<ImproveAgentView />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <StrictMode> */}
    <App>
      <RouterProvider router={router} />
    </App>
    {/* </StrictMode> */},
  </Provider>,
);
