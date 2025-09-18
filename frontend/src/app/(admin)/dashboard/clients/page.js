"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Page.module.css";
import { upsertContentNext } from "@/app/(admin)/utils/api";

const DEFAULT_CLIENTS = {
  items: [
    // { name, logo, link, order }
  ],
};

export default function ClientsEditor() {
  const [data, setData] = useState(DEFAULT_CLIENTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/clients/list", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setData(json?.content || DEFAULT_CLIENTS);
        }
      } catch (_) {}
      setLoading(false);
    }
    load();
  }, []);

  function parseItems(text) {
    // One per line: name | logoURL | link | order
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const items = lines.map((line) => {
      const [name, logo, link, order] = line.split("|").map((s) => s?.trim());
      return { name: name || "", logo: logo || "", link: link || "", order: Number(order) || 0 };
    });
    return items.sort((a, b) => a.order - b.order);
  }

  async function onSave() {
    setSaving(true);
    setMessage("");
    try {
      await upsertContentNext({ section: "clients", page: "list", content: data });
      setMessage("Saved successfully");
    } catch (e) {
      setMessage("Failed to save. Check your login / connection.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Clients / Partners</h1>
      <p className={styles.help}>One per line as: Name | LogoURL | Link | Order</p>
      <textarea
        className={styles.textarea}
        value={(data.items || []).map((i) => `${i.name} | ${i.logo} | ${i.link} | ${i.order}`).join("\n")}
        onChange={(e) => setData({ ...data, items: parseItems(e.target.value) })}
        placeholder="Client A | https://logo.png | https://site.com | 1"
      />
      <button className={styles.btn} disabled={saving} onClick={onSave}>
        {saving ? "Saving..." : "Save"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

