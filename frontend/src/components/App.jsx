// frontend/src/components/App.jsx
import React, { useState, useEffect } from 'react';
import { getUrlParameter, cleanUrlParameters } from '../utils/urlUtils';
import { checkAuthStatus, exchangeAuthCode } from '../services/authService';
import { fetchPatientData } from '../services/patientService';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import PatientInfo from './patient/PatientInfo';
import Loading from './common/Loading';
import ErrorDisplay from './common/ErrorDisplay';
import '../styles/App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for authentication status when the app loads
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for code in URL (redirected from Epic)
        const authCode = getUrlParameter('code');
        const authError = getUrlParameter('error');
        
        if (authError) {
          setError(`Authentication error: ${authError}`);
          setLoading(false);
          return;
        }
        
        // If we have a code, exchange it for tokens
        if (authCode) {
          try {
            // Send the code to the backend
            await exchangeAuthCode(authCode);
            setIsAuthorized(true);
            
            // Fetch patient data
            const data = await fetchPatientData();
            console.log(data)
            setPatientData(data);
          } catch (exchangeError) {
            console.error('Error exchanging code:', exchangeError);
            setError('Failed to complete authentication. Please try again.');
          }
        } else {
          // No code, check if we're already authenticated
          const isAuthenticated = await checkAuthStatus();
          if (isAuthenticated) {
            setIsAuthorized(true);
            
            // Fetch patient data
            const data = await fetchPatientData();
            setPatientData(data);
          }
        }
      } catch (err) {
        console.error('Error initializing app:', err);
        setError('Failed to initialize application. Please try again.');
      } finally {
        setLoading(false);
        
        // Clean up URL parameters
        cleanUrlParameters(['code', 'state', 'error']);
      }
    };
    
    initializeApp();
  }, []);

  // Handle logout
  const handleLogout = () => {
    setIsAuthorized(false);
    setPatientData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Epic FHIR OAuth 2.0 Demo</h1>
      </header>
      
      <main className="App-main">
        {loading ? (
          <Loading message="Initializing application..." />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="content-container">
            {!isAuthorized ? (
              <div className="auth-container">
                <h2>Connect to Epic</h2>
                <p>Click the button below to authorize access to your Epic health record data.</p>
                <LoginButton />
              </div>
            ) : (
              <div className="authenticated-container">
                <div className="auth-header">
                  <h2>Connected to Epic</h2>
                  <LogoutButton onLogout={handleLogout} />
                </div>
                <PatientInfo patientData={patientData} />
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>Epic FHIR OAuth 2.0 Demo - For Educational Purposes Only</p>
      </footer>
    </div>
  );
}

export default App;