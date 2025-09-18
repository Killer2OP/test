"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Page.module.css";
import { upsertContent } from "@/app/(admin)/utils/api";

const DEFAULT_ABOUT = {
  companyInfo: "",
  history: "",
  teamMembers: [], // [{ name, role, image }]
  images: [], // [url]
};

export default function AboutPage() {
  const [data, setData] = useState(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/about/about", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setData(json?.content || DEFAULT_ABOUT);
        }
      } catch (_) {}
      setLoading(false);
    }
    load();
  }, []);

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  function setTeamFromTextarea(value) {
    const lines = value.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const team = lines.map((line) => {
      const [name, role, image] = line.split("|").map((s) => s?.trim());
      return { name: name || "", role: role || "", image: image || "" };
    });
    setField("teamMembers", team);
  }

  async function onSave() {
    setSaving(true);
    setMessage("");
    try {
      await upsertContent({ section: "about", page: "about", content: data });
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
      <h1>About Us Content</h1>

      <div className={styles.section}>
        <h2>Company Info</h2>
        <textarea
          className={styles.textarea}
          value={data.companyInfo}
          onChange={(e) => setField("companyInfo", e.target.value)}
          placeholder="Company info / overview"
        />
      </div>

      <div className={styles.section}>
        <h2>History</h2>
        <textarea
          className={styles.textarea}
          value={data.history}
          onChange={(e) => setField("history", e.target.value)}
          placeholder="Company history"
        />
      </div>

      <div className={styles.section}>
        <h2>Team Members</h2>
        <p className={styles.help}>One per line as: Name | Role | ImageURL</p>
        <textarea
          className={styles.textarea}
          value={data.teamMembers.map((t) => `${t.name} | ${t.role} | ${t.image}`).join("\n")}
          onChange={(e) => setTeamFromTextarea(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <h2>Images</h2>
        <p className={styles.help}>One image URL per line</p>
        <textarea
          className={styles.textarea}
          value={data.images.join("\n")}
          onChange={(e) => setField("images", e.target.value.split(/\n+/).map((s)=>s.trim()).filter(Boolean))}
        />
      </div>

      <button className={styles.btn} disabled={saving} onClick={onSave}>
        {saving ? "Saving..." : "Save"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
