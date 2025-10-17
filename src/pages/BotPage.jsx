import { useState } from "react";
import data from "../sampleData.json";
import { loadHistory, saveHistory } from "../utils/storage";


const DEFAULT_REPLY = "Sorry, Did not understand your query!";


export function BotPage() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]); // {role:'user'|'ai', text:string}[]
  function onSave() {
  // Save each user→ai pair as a history item: { question, response }
  const hist = loadHistory();
  const pairs = [];

  for (let i = 0; i < messages.length; i += 2) {
    const u = messages[i];
    const a = messages[i + 1];
    if (u && u.role === "user" && a && a.role === "ai") {
      pairs.push({ question: u.text, response: a.text });
    }
  }

  if (pairs.length === 0) return; // nothing to save

  const next = [...hist, ...pairs];
  saveHistory(next);

  // reset chat after save (simple UX)
  // optional: alert to confirm
  // eslint-disable-next-line no-alert
  alert("Conversation saved.");
}


  function findAnswer(qRaw) {
    const q = qRaw.trim();
    // exact first
    let hit = data.find(d => d.question === q);
    if (hit) return hit.response;

    // tolerant: remove trailing ? and lowercase
    const norm = q.replace(/[?]+$/, "").toLowerCase();
    hit = data.find(d => d.question.toLowerCase() === norm);
    return hit ? hit.response : DEFAULT_REPLY;
  }

  function onSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;

    const reply = findAnswer(q);

    setMessages(prev => [
      ...prev,
      { role: "user", text: q },
      { role: "ai", text: reply }
    ]);

    setValue(""); // clear input after submit
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* transcript */}
      <section style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
         {messages.map((m, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 10, padding: 10, background: "#fff" }}>
           {m.role === "ai" ? (
  <div style={{ position: "relative" }}>
    <span>Soul AI</span>
    <p style={{ margin: "6px 0 0" }}>{m.text}</p>

    <div
  style={{
    position: "absolute",
    right: "8px",
    top: "8px",
    opacity: 0.6,         // visible but not too bright
    transition: "opacity 0.2s",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}    // hover in
  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}  // hover out
>
  <button style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "18px" }}>👍</button>
  <button style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "18px" }}>👎</button>
</div>

  </div>
) : (
  <>
    <span>You</span>
    <p style={{ margin: "6px 0 0" }}>{m.text}</p>
  </>
)}

          </div>
        ))}

      </section>

      {/* input form */}
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        {/* REQUIRED: exact placeholder text below */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message Bot AI..."
          aria-label="Chat input"
          style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        {/* REQUIRED: Ask must be type=submit */}
        <button type="submit">Ask</button>
        <button type="button" onClick={onSave}>Save</button>

      </form>
    </div>
  );
}
/**
 * return (
 * <div>
 * <input
 * 
 * />
 * </div>)
 */