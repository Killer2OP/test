// api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = (data) => api.post("/api/auth/login", data);
export const getMe = () => api.get("/api/auth/me");
export const changePassword = (data) => api.put("/api/auth/change-password", data);
export const logout = () => api.post("/api/auth/logout");

// Dashboard API
export const getDashboardStats = () => api.get("/api/admin/dashboard");

// Blogs API
export const getBlogs = (params) => api.get("/api/admin/blogs", { params });
export const getBlog = (id) => api.get(`/api/admin/blogs/${id}`);
export const createBlog = (data) => api.post("/api/admin/blogs", data);
export const updateBlog = (id, data) => api.put(`/api/admin/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/api/admin/blogs/${id}`);

// Products API
export const getProducts = (params) => api.get("/api/admin/products", { params });
export const getProduct = (id) => api.get(`/api/admin/products/${id}`);
export const createProduct = (data) => api.post("/api/admin/products", data);
export const updateProduct = (id, data) => api.put(`/api/admin/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/api/admin/products/${id}`);

// Contacts API
export const getContacts = (params) => api.get("/api/admin/contacts", { params });
export const getContact = (id) => api.get(`/api/admin/contacts/${id}`);
export const updateContactStatus = (id, data) => api.put(`/api/admin/contacts/${id}/status`, data);
export const assignContact = (id, data) => api.put(`/api/admin/contacts/${id}/assign`, data);
export const deleteContact = (id) => api.delete(`/api/admin/contacts/${id}`);

// Content API (protected)
export const getContentBySectionPage = (section, page) => api.get(`/api/content/${section}/${page}`);
export const upsertContent = (data) => api.post("/api/content", data);
export const deleteContent = (id) => api.delete(`/api/content/${id}`);

// Content API via Next proxy (avoids cross-origin issues). Use inside client components.
export const upsertContentNext = async (data) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  const res = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} ${text}`);
  }
  return res.json();
};

export default api;
