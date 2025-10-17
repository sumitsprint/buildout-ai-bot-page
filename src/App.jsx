import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { BotPage } from "./pages/BotPage";
import { HistoryPage } from "./pages/HistoryPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <h1 style={{ margin: 0 }}>Bot AI</h1>
        <nav style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <NavLink to="/" end>New Chat</NavLink>
          <NavLink to="/history">Past Conversations</NavLink>
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<BotPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
