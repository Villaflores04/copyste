"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function EditPage({ params }) {
  const [text, setText] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("panels")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setText(data.content);
    }
  }

  async function save() {
    await supabase
      .from("panels")
      .update({ content: text })
      .eq("id", params.id);

    alert("Saved");
  }

  return (
    <main className="editPage">

      <h2>Edit Panel</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="actions">
        <button onClick={() => history.back()}>
          Back
        </button>

        <button onClick={save}>
          Save
        </button>
      </div>

    </main>
  );
}
