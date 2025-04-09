// frontend/src/components/patient/PatientHeader.jsx
import React from 'react';
import { formatPatientName } from '../../services/patientService';

function PatientHeader({ patientData }) {
  const patientName = formatPatientName(patientData);
  const patientGender = patientData.gender || 'Unknown';
  const patientDob = patientData.birthDate || 'Unknown';
  
  // Calculate age if birthDate is available
  let age = 'Unknown';
  if (patientData.birthDate) {
    const birthDate = new Date(patientData.birthDate);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }
    
    age = `${ageYears} years`;
  }
  
  return (
    <div className="patient-header">
      <h2>Patient Information</h2>
      <div className="patient-summary">
        <div className="patient-avatar">
          {patientName.charAt(0)}
        </div>
        <div className="patient-basic-info">
          <h3>{patientName}</h3>
          <div className="patient-demographics">
            <span className="patient-gender">{patientGender}</span>
            <span className="patient-separator">•</span>
            <span className="patient-dob">DOB: {patientDob}</span>
            <span className="patient-separator">•</span>
            <span className="patient-age">Age: {age}</span>
          </div>
          <div className="patient-id">
            ID: {patientData.id || 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHeader;