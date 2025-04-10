// frontend/src/config/config.js
const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001',
    endpoints: {
      login: '/api/auth/login',
      token: '/api/auth/token',
      logout: '/api/auth/logout',
      patient: '/api/patient',
    }
  };
  
  export default config;