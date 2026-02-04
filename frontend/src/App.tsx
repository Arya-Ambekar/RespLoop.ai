import { Route, Routes } from "react-router-dom";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
    </>
  );
}

export default App;
