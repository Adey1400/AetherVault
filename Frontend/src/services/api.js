import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Automatically retrieve the token from localStorage
    const token = localStorage.getItem('aether_jwt');
    
    // If a token exists, attach it as a Bearer token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetch all secrets for the authenticated user
 * @returns {Promise<any>} Response data
 */
export const fetchUserSecrets = async () => {
  const response = await api.get('/api/secrets');
  return response.data;
};

/**
 * Save a new user secret
 * @param {Object} payload The secret data payload
 * @returns {Promise<any>} Response data
 */
export const saveUserSecret = async (payload) => {
  const response = await api.post('/api/secrets', payload);
  return response.data;
};

export default api;
