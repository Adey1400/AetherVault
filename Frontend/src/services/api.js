import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Automatically retrieve the token from localStorage
    const token = localStorage.getItem('aether_jwt')||sessionStorage.getItem('aether_jwt');
    
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

/**
 * Delete a user secret by ID
 * @param {number|string} id The ID of the secret to delete
 * @returns {Promise<any>} Response data
 */
export const deleteUserSecret = async (id) => {
  const response = await api.delete(`/api/secrets/${id}`);
  return response.data;
};


/**
 * Fetch the current authenticated user's profile
 * @returns {Promise<any>} Response data
 */
export const fetchCurrentUser = async () => {
  const response = await api.get('/api/users/me');
  return response.data;
};

/**
 * Tell the backend that the user has generated and saved their Master Key
 * @returns {Promise<any>} Response data
 */
export const initializeVaultStatus = async () => {
  const response = await api.post('/api/users/initialize-vault');
  return response.data;
};

/**
 * Register a new user with Email/Password
 */
export const registerUser = async (email, password) => {
  const response = await api.post('/api/auth/register', { email, password });
  return response.data;
};

/**
 * Login an existing user with Email/Password
 */
export const loginUser = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export default api;