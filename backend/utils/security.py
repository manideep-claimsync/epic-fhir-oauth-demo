# backend/utils/security.py
import secrets
import hashlib
import base64

def generate_random_state():
    """
    Generate a random state parameter for CSRF protection
    
    Returns:
        str: Random state string
    """
    return secrets.token_hex(16)

def validate_state(received_state, stored_state):
    """
    Validate that the received state matches the stored state
    
    Args:
        received_state (str): State received from the authorization server
        stored_state (str): State stored in the session
        
    Returns:
        bool: True if states match, False otherwise
    """
    if not received_state or not stored_state:
        return False
    return received_state == stored_state
