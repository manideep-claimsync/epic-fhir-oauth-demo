// frontend/src/components/patient/PatientInfo.jsx
import React, { useState } from 'react';
import PatientHeader from './PatientHeader';
import PatientDetails from './PatientDetails';

function PatientInfo({ patientData }) {
  const [showRawData, setShowRawData] = useState(false);
  
  if (!patientData) {
    return (
      <div className="patient-info patient-info-empty">
        <p>No patient data available</p>
      </div>
    );
  }
  
  const toggleRawData = () => {
    setShowRawData(!showRawData);
  };
  
  return (
    <div className="patient-info">
      <PatientHeader patientData={patientData} />
      
      <PatientDetails patientData={patientData} />
      
      <div className="raw-data-toggle">
        <button 
          className="toggle-button"
          onClick={toggleRawData}
        >
          {showRawData ? 'Hide Raw FHIR Data' : 'Show Raw FHIR Data'}
        </button>
      </div>
      
      {showRawData && (
        <div className="raw-data">
          <h3>Raw FHIR Data:</h3>
          <pre>{JSON.stringify(patientData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default PatientInfo;