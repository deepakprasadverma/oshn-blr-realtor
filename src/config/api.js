// API Base URL configuration
// In local development, defaults to http://localhost:5000
// In production (Vercel/Render), can be overridden with VITE_API_URL environment variable
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://oshn-blr-realtor.onrender.com"
    : "http://localhost:5000");

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  PROPERTIES: `${API_BASE_URL}/api/properties`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_ENQUIRIES: `${API_BASE_URL}/api/admin/enquiries`,
  ADMIN_PURGE: `${API_BASE_URL}/api/admin/purge-all`,
  ADMIN_STATS: `${API_BASE_URL}/api/admin/system-stats`,
};
