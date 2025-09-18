"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Page.module.css";
import { upsertContentNext } from "@/app/(admin)/utils/api";

const DEFAULT_HOME = {
  title: "",
  subtitle: "",
  description: "",
};

export default function HomeEditor() {
  const [data, setData] = useState(DEFAULT_HOME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/hero/home", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setData(json?.content || DEFAULT_HOME);
        }
      } catch (_) {}
      setLoading(false);
    }
    load();
  }, []);

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  async function onSave() {
    setSaving(true);
    setMessage("");
    try {
      await upsertContentNext({ section: "hero", pageType: "home", content: data, title: "Home Hero" });
      setMessage("Saved successfully");
    } catch (e) {
      setMessage("Failed to save. Check your login / connection.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Home Content</h1>

      <div className={styles.section}>
        <h2>Hero</h2>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={data.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="Hero title"
        />
        <label className={styles.label}>Subtitle</label>
        <input
          className={styles.input}
          value={data.subtitle}
          onChange={(e) => setField("subtitle", e.target.value)}
          placeholder="Hero subtitle"
        />
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={data.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Hero description"
        />
      </div>

      <button className={styles.btn} disabled={saving} onClick={onSave}>
        {saving ? "Saving..." : "Save"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

