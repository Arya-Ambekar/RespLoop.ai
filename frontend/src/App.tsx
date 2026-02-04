import { Route, Routes } from "react-router-dom";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>
    </>
  );
}

export default App;
