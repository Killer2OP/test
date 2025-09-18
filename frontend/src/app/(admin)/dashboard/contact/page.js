"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Page.module.css";
import { upsertContentNext } from "@/app/(admin)/utils/api";

const DEFAULT_CONTACT = {
  heading: "Get in touch with us",
  intro: "Please fill in your details and our dedicated team will reach out.",
  phones: ["+91 9873173214", "+91 9205992676"],
  emails: ["smpl@narsinghdass.com", "material@narsinghdass.com"],
  address: "",
  mapEmbedUrl: "",
};

export default function ContactEditor() {
  const [data, setData] = useState(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/contact/main", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setData(json?.content || DEFAULT_CONTACT);
        }
      } catch (_) {}
      setLoading(false);
    }
    load();
  }, []);

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));

  async function onSave() {
    setSaving(true);
    setMessage("");
    try {
      await upsertContentNext({ section: "contact", page: "main", content: data });
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
      <h1>Contact Page Content</h1>

      <label className={styles.label}>Heading</label>
      <input
        className={styles.input}
        value={data.heading}
        onChange={(e) => setField("heading", e.target.value)}
        placeholder="Heading"
      />

      <label className={styles.label}>Intro</label>
      <textarea
        className={styles.textarea}
        value={data.intro}
        onChange={(e) => setField("intro", e.target.value)}
        placeholder="Intro text"
      />

      <label className={styles.label}>Phones (one per line)</label>
      <textarea
        className={styles.textarea}
        value={(data.phones || []).join("\n")}
        onChange={(e) => setField("phones", e.target.value.split(/\n+/).map((s)=>s.trim()).filter(Boolean))}
      />

      <label className={styles.label}>Emails (one per line)</label>
      <textarea
        className={styles.textarea}
        value={(data.emails || []).join("\n")}
        onChange={(e) => setField("emails", e.target.value.split(/\n+/).map((s)=>s.trim()).filter(Boolean))}
      />

      <label className={styles.label}>Address</label>
      <textarea
        className={styles.textarea}
        value={data.address}
        onChange={(e) => setField("address", e.target.value)}
      />

      <label className={styles.label}>Google Maps Embed URL</label>
      <input
        className={styles.input}
        value={data.mapEmbedUrl}
        onChange={(e) => setField("mapEmbedUrl", e.target.value)}
        placeholder="https://www.google.com/maps/embed?..."
      />

      <button className={styles.btn} disabled={saving} onClick={onSave}>
        {saving ? "Saving..." : "Save"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

