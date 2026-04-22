const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function getDashboard() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load dashboard");
    return res.json();
  } catch {
    return {
      latest_run: null,
      runs: [],
      opportunities: [],
    };
  }
}

export default async function Home() {
  const data = await getDashboard();
  const total = data.opportunities?.length || 0;

  return (
    <main style={{ fontFamily: "Inter, sans-serif", padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Bayo Job Radar</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Self-running opportunity intelligence engine for remote lifecycle, email, content, and growth roles.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, margin: "24px 0" }}>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Opportunities</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{total}</div>
        </div>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Latest run status</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.latest_run?.status || "not run yet"}</div>
        </div>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#666" }}>Raw items last run</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.latest_run?.raw_item_count || 0}</div>
        </div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <form action={`${API_BASE}/scan`} method="post" target="_blank">
          <button style={{ padding: "12px 16px", borderRadius: 10, border: 0, cursor: "pointer", fontWeight: 700 }}>
            Trigger scan
          </button>
        </form>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        {data.opportunities?.map((opp: any) => (
          <article key={opp.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h2 style={{ margin: "0 0 6px 0", fontSize: 20 }}>{opp.job_title}</h2>
                <div>{opp.company}</div>
              </div>
              <div>
                <strong>{opp.score}</strong>/100
              </div>
            </div>
            <p style={{ marginTop: 12 }}>{opp.match_reason}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 14 }}>
              <span>Priority: {opp.apply_priority}</span>
              <span>Action: {opp.recommended_action}</span>
              <span>Risk: {opp.eligibility_risk}</span>
              <span>Source: {opp.source}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
