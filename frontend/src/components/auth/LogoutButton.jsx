// frontend/src/components/auth/LogoutButton.jsx
import React, { useState } from 'react';
import { logout } from '../../services/authService';

function LogoutButton({ onLogout }) {
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    setLoading(true);
    
    try {
      await logout();
      if (onLogout) {
        onLogout();
      }
    } catch (err) {
      console.error('Logout error:', err);
      // Show a brief error message
      alert('Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button 
      className="logout-button" 
      onClick={handleLogout} 
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Disconnect'}
    </button>
  );
}

export default LogoutButton;