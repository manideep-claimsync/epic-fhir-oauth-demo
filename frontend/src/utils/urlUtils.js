// frontend/src/utils/urlUtils.js

/**
 * Get a parameter value from the URL query string
 * 
 * @param {string} name - Parameter name to extract
 * @returns {string|null} - Parameter value or null if not found
 */
export function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  /**
   * Clean up URL parameters
   * 
   * @param {Array} paramsToRemove - List of parameter names to remove
   */
  export function cleanUrlParameters(paramsToRemove = []) {
    if (window.history.replaceState) {
      const url = new URL(window.location.href);
      
      // If specific params provided, remove only those
      if (paramsToRemove.length > 0) {
        paramsToRemove.forEach(param => {
          url.searchParams.delete(param);
        });
        
        window.history.replaceState({}, document.title, url.toString());
      } else {
        // Remove all search params
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }