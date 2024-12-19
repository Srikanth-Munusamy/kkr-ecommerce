// src/apiOperations.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your backend URL
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch data from a given URL
export const fetchData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}`, error);
    
    throw error;
  }
};

// Delete a resource by ID
export const deleteResource = async (url) => {
  try {
    await api.delete(url);
  } catch (error) {
    console.error(`Failed to delete resource at ${url}`, error);
    throw error;
  }
};

// Other API functions (e.g., create, update) can be added here
