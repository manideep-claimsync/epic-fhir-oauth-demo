// frontend/src/components/auth/LoginButton.jsx
import React, { useState } from 'react';
import { initiateOAuthFlow } from '../../services/authService';

function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await initiateOAuthFlow();
      // No need to set loading to false as we'll be redirected
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to Epic. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="login-button-container">
      <button 
        className="login-button" 
        onClick={handleLogin} 
        disabled={loading}
      >
        {loading ? 'Connecting...' : 'Connect to Epic'}
      </button>
      
      {error && (
        <div className="login-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default LoginButton;