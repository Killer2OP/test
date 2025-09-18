"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Page.module.css";
import { upsertContentNext } from "@/app/(admin)/utils/api";

const DEFAULT_PAGE = {
  title: "",
  body: "",
  images: [],
  metaTitle: "",
  metaDescription: "",
};

export default function OtherPagesEditor() {
  const [slug, setSlug] = useState("");
  const [data, setData] = useState(DEFAULT_PAGE);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/content/other/${slug}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json?.content || DEFAULT_PAGE);
      } else {
        setData(DEFAULT_PAGE);
      }
    } catch (_) {
      setData(DEFAULT_PAGE);
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    if (!slug) {
      setMessage("Please enter a page slug");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await upsertContentNext({ section: "other", page: slug, content: data });
      setMessage("Saved successfully");
    } catch (e) {
      setMessage("Failed to save. Check your login / connection.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Other Pages</h1>

      <label className={styles.label}>Page Slug</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className={styles.input}
          value={slug}
          onChange={(e) => setSlug(e.target.value.trim())}
          placeholder="e.g. careers, testimonials, faq"
        />
        <button className={styles.btn} onClick={load} disabled={!slug || loading}>
          {loading ? "Loading..." : "Load"}
        </button>
      </div>

      <label className={styles.label}>Title</label>
      <input
        className={styles.input}
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        placeholder="Page Title"
      />

      <label className={styles.label}>Body</label>
      <textarea
        className={styles.textarea}
        value={data.body}
        onChange={(e) => setData({ ...data, body: e.target.value })}
        placeholder="Page content (markdown or plain text)"
      />

      <label className={styles.label}>Images (one URL per line)</label>
      <textarea
        className={styles.textarea}
        value={(data.images || []).join("\n")}
        onChange={(e) => setData({ ...data, images: e.target.value.split(/\n+/).map((s)=>s.trim()).filter(Boolean) })}
      />

      <label className={styles.label}>Meta Title</label>
      <input
        className={styles.input}
        value={data.metaTitle}
        onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
        placeholder="SEO title"
      />

      <label className={styles.label}>Meta Description</label>
      <textarea
        className={styles.textarea}
        value={data.metaDescription}
        onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
        placeholder="SEO description"
      />

      <button className={styles.btn} onClick={onSave} disabled={saving || !slug}>
        {saving ? "Saving..." : "Save"}
      </button>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

