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

def generate_code_verifier():
    """
    Generate a code verifier for PKCE
    
    Returns:
        str: Code verifier string
    """
    return secrets.token_urlsafe(64)

def generate_code_challenge(code_verifier):
    """
    Generate a code challenge from the code verifier using S256 method
    
    Args:
        code_verifier (str): The code verifier
        
    Returns:
        str: Code challenge
    """
    # Hash the verifier using SHA-256
    code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
    
    # Base64 encode the hash
    code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8')
    
    # Remove padding characters
    code_challenge = code_challenge.replace('=', '')
    
    return code_challenge