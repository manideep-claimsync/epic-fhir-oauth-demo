// frontend/src/components/patient/PatientDetails.jsx
import React from 'react';
import { formatPatientAddress } from '../../services/patientService';

function PatientDetails({ patientData }) {
  // Format contact information
  const contactInfo = patientData.telecom || [];
  const formattedAddress = formatPatientAddress(patientData);
  
  return (
    <div className="patient-details">
      <div className="info-card">
        <h3>Contact Information</h3>
        {contactInfo.length > 0 ? (
          <ul className="contact-list">
            {contactInfo.map((contact, index) => (
              <li key={index} className="contact-item">
                <span className="contact-type">{contact.system}:</span>
                <span className="contact-value">{contact.value}</span>
                {contact.use && (
                  <span className="contact-use">({contact.use})</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No contact information available</p>
        )}
      </div>
      
      <div className="info-card">
        <h3>Address</h3>
        <p className="patient-address">{formattedAddress}</p>
      </div>
      
      <div className="info-card">
        <h3>Status</h3>
        <p className="patient-status">
          Active: <span className={`status-indicator ${patientData.active ? 'active' : 'inactive'}`}>
            {patientData.active ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default PatientDetails;