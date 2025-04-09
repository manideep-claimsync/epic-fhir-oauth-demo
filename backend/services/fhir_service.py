# backend/services/fhir_service.py
import requests
from flask import current_app as app

class FHIRService:
    """Service for interacting with Epic's FHIR API"""
    
    def get_patient(self, access_token):
        """
        Fetch patient data from Epic's FHIR API
        
        Args:
            access_token (str): OAuth access token
            
        Returns:
            dict: Patient data in FHIR format
        """
        # Make the request to Epic FHIR API
        response = requests.get(
            f"{app.config['EPIC_FHIR_API_URL']}/Patient/erXuFYUfucBZaryVksYEcMg3",
            headers={
                'Authorization': f"Bearer {access_token}",
                'Accept': 'application/json'
            }
        )
        
        # Check if the request was successful
        if response.status_code != 200:
            raise Exception(f"FHIR API request failed with status {response.status_code}")
        
        # Return the patient data
        return response.json()
    
    
    def get_patient_resource(self, access_token, resource_type, patient_id=None):
        """
        Fetch specific resource types for a patient
        
        Args:
            access_token (str): OAuth access token
            resource_type (str): FHIR resource type (e.g., 'Observation', 'MedicationRequest')
            patient_id (str, optional): Patient ID for the request
            
        Returns:
            dict: FHIR resource data
        """
        # Build the URL based on whether we have a patient ID
        url = f"{app.config['EPIC_FHIR_API_URL']}/{resource_type}"
        if patient_id:
            url += f"?patient={patient_id}"
        
        # Make the request to Epic FHIR API
        response = requests.get(
            url,
            headers={
                'Authorization': f"Bearer {access_token}",
                'Accept': 'application/json'
            }
        )
        
        # Check if the request was successful
        if response.status_code != 200:
            raise Exception(f"FHIR API request failed with status {response.status_code}")
        
        # Return the resource data
        return response.json()