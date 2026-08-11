import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8085/api/v1';

/**
 * Axios instance configured for the PG OS API.
 * - Base URL from environment variable
 * - JWT token injection via interceptor
 * - Automatic 401 handling (redirect to login)
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds
});

// Request interceptor — attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pgos_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('pgos_refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem('pgos_access_token', accessToken);
          localStorage.setItem('pgos_refresh_token', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed — clear tokens and redirect to login
          localStorage.removeItem('pgos_access_token');
          localStorage.removeItem('pgos_refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token — redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
