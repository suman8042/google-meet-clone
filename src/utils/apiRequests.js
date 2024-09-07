import axios from 'axios';

// Get the base URL from the Vite environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

// General function to handle API requests
const requestHandler = async (method, url, payload = {}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,  // Concatenate base URL with the specific endpoint
      data: payload
    });
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data : err.message };
  }
};

// POST request
export const postRequest = (url, payload = {}) => {
  return requestHandler('post', url, payload);
};

// PUT request
export const putRequest = (url, payload = {}) => {
  return requestHandler('put', url, payload);
};

// GET request
export const getRequest = (url) => {
  return requestHandler('get', url);
};

// DELETE request
export const deleteRequest = (url) => {
  return requestHandler('delete', url);
};
