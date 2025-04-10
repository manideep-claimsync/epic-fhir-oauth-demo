// frontend/src/services/authService.js
import { get, post } from '../utils/apiUtils';
import config from '../config/config';

/**
 * Initiate the OAuth 2.0 authorization flow with Epic
 * 
 * @returns {Promise} Promise that resolves with auth URL
 */
export async function initiateOAuthFlow() {
  try {
    const response = await get(config.endpoints.login);
    
    // Redirect to Epic's authorization page
    if (response && response.auth_url) {
      window.location.href = response.auth_url;
      return true;
    } else {
      throw new Error('No authorization URL received');
    }
  } catch (error) {
    console.error('Error initiating OAuth flow:', error);
    throw error;
  }
}

/**
 * Check if the user is currently authenticated
 * 
 * @returns {Promise<boolean>} Promise that resolves with authentication status
 */
export async function checkAuthStatus() {
  try {
    const response = await get(config.endpoints.token);
    return response && response.authenticated === true;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

/**
 * Log out the current user
 * 
 * @returns {Promise} Promise that resolves when logout is complete
 */
export async function logout() {
  try {
    return await post(config.endpoints.logout);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}