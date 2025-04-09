// frontend/src/utils/apiUtils.js
import config from '../config/config';

/**
 * Base function for API requests
 * 
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options
 * @returns {Promise} - Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${config.apiBaseUrl}${endpoint}`;
  
  // Default options for all requests
  const defaultOptions = {
    credentials: 'include', // Include cookies for session authentication
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }
  };
  
  // Merge default options with provided options
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {})
    }
  };
  
  try {
    const response = await fetch(url, fetchOptions);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.error || `API request failed with status ${response.status}`,
        data: errorData
      };
    }
    
    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * GET request helper
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export function get(endpoint, options = {}) {
  return apiRequest(endpoint, {
    method: 'GET',
    ...options
  });
}

/**
 * POST request helper
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request payload
 * @param {Object} options - Additional fetch options
 * @returns {Promise} - Response data
 */
export function post(endpoint, data = {}, options = {}) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options
  });
}