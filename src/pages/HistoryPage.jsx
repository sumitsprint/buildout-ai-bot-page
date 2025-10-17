import { loadHistory } from "../utils/storage";

export function HistoryPage() {
  const items = loadHistory(); // [{ question, response }]

  return (
    <div>
      {/* Tests look for this exact phrase inside a <div> */}
      <div>Past Conversations</div>

      {items.length === 0 ? (
        <p>No saved conversations yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it, idx) => (
            <li key={idx} style={{ margin: "8px 0", padding: "8px", border: "1px solid #eee", borderRadius: "8px" }}>
              <div>{it.question}</div>
              <p style={{ margin: "4px 0 0" }}><strong>AI:</strong> {it.response}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
