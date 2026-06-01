"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    loadPanels();
  }, []);

  async function loadPanels() {
    const { data } = await supabase
      .from("panels")
      .select("*")
      .order("id");

    setPanels(data || []);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <main className="container">
      <h1>CopySte</h1>

      <div className="grid">
        {panels.map((panel) => (
          <div key={panel.id} className="card">

            <button
              className="btn"
              onClick={() =>
                location.href = `/edit/${panel.id}`
              }
            >
              Edit
            </button>

            <div className="square">
              {panel.content}
            </div>

            <button
              className="btn"
              onClick={() => copyText(panel.content)}
            >
              Copy
            </button>

          </div>
        ))}
      </div>
    </main>
  );
}
