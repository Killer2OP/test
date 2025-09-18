import axios from "axios";

const base = "/api/content";

export type ContentPayload = {
  section: string;
  page: string;
  content: any;
};

export async function fetchContent(section: string, page: string) {
  try {
    const { data } = await axios.get(`${base}/${section}/${page}`);
    return data?.content ?? null;
  } catch (err) {
    // Return null when not found (404)
    return null;
  }
}

export async function saveContent(payload: ContentPayload) {
  const { data } = await axios.post(base, payload);
  return data;
}
