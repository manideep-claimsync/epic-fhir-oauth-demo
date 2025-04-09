# backend/routes/patient.py
from flask import Blueprint, jsonify, session
from services.fhir_service import FHIRService

patient_bp = Blueprint('patient', __name__)
fhir_service = FHIRService()

@patient_bp.route('', methods=['GET'])
def get_patient():
    """Fetch patient data from Epic FHIR API"""
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        # Fetch patient data from Epic's FHIR API
        patient_data = fhir_service.get_patient(access_token)
        return jsonify(patient_data)
        
    except Exception as e:
        print(f"Error fetching patient data: {e}")
        return jsonify({'error': 'Failed to fetch patient data'}), 500

@patient_bp.route('/simulated', methods=['GET'])
def get_simulated_patient():
    """Return simulated patient data for demonstration"""
    # Check if user is authorized
    if not session.get('access_token'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    # Get simulated patient data
    simulated_data = fhir_service.get_simulated_patient()
    return jsonify(simulated_data)