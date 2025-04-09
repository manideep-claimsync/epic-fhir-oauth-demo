// frontend/src/services/patientService.js
import { get } from '../utils/apiUtils';
import config from '../config/config';

/**
 * Fetch patient data from the FHIR API
 * 
 * @returns {Promise} Promise that resolves with patient data
 */
export async function fetchPatientData() {
  try {
    return await get(config.endpoints.patient);
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw error;
  }
}

/**
 * Format patient name from FHIR data
 * 
 * @param {Object} patientData - FHIR patient resource
 * @returns {string} Formatted patient name
 */
export function formatPatientName(patientData) {
  if (!patientData || !patientData.name || !patientData.name.length) {
    return 'Unknown Patient';
  }
  
  const name = patientData.name[0];
  const given = name.given ? name.given.join(' ') : '';
  const family = name.family || '';
  
  return `${given} ${family}`.trim();
}

/**
 * Format patient address from FHIR data
 * 
 * @param {Object} patientData - FHIR patient resource
 * @returns {string} Formatted patient address
 */
export function formatPatientAddress(patientData) {
  if (!patientData || !patientData.address || !patientData.address.length) {
    return 'No address on file';
  }
  
  const address = patientData.address[0];
  const line = address.line ? address.line.join(', ') : '';
  const city = address.city || '';
  const state = address.state || '';
  const postalCode = address.postalCode || '';
  
  return `${line}, ${city}, ${state} ${postalCode}`.trim();
}