"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    loadPanels();
  }, []);

  async function loadPanels() {
    const { data, error } = await supabase
      .from("panels")
      .select("*")
      .order("id");

    if (!error) {
      setPanels(data || []);
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy text.");
    }
  }

  function previewText(text) {
    if (!text) return "";

    return text.length > 50
      ? text.substring(0, 50) + "..."
      : text;
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
                (window.location.href = `/edit/${panel.id}`)
              }
            >
              Edit
            </button>

            <div className="square">
              {previewText(panel.content)}
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
