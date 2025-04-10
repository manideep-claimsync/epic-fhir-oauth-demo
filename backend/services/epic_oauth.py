# backend/services/epic_oauth.py
import secrets
import requests
from urllib.parse import urlencode
from flask import current_app as app
from utils.security import generate_code_verifier

class EpicOAuthService:
    """Service for handling Epic OAuth 2.0 operations"""
    
    def create_authorization_url(self):
        """
        Create the authorization URL for initiating the OAuth flow
        
        Returns:
            tuple: (authorization_url, state, code_verifier)
        """
        # Generate state and code verifier for PKCE
        state = secrets.token_hex(16)
        code_verifier = generate_code_verifier()
        
        # Build the authorization URL parameters
        auth_params = {
            'response_type': 'code',
            'client_id': app.config['EPIC_CLIENT_ID'],
            'redirect_uri': app.config['EPIC_REDIRECT_URI'],
            'state': state,
            'scope': 'openid',
            'aud': app.config['EPIC_FHIR_API_URL']
        }
        
        # Construct the authorization URL with properly encoded query parameters
        auth_url = f"{app.config['EPIC_AUTH_URL']}?{urlencode(auth_params)}"
        
        return auth_url, state, code_verifier
    
    def generate_new_code_verifier(self):
        """
        Generate a new code verifier for PKCE
        
        Returns:
            str: A new code verifier
        """
        return generate_code_verifier()
    
    def exchange_code_for_token(self, code, code_verifier):
        """
        Exchange authorization code for access token
        
        Args:
            code (str): The authorization code from Epic
            code_verifier (str): The PKCE code verifier
            
        Returns:
            dict: Token response containing access_token, refresh_token, etc.
        """
        # Prepare the token request
        token_data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': app.config['EPIC_REDIRECT_URI'],
            'client_id': app.config['EPIC_CLIENT_ID'],
            'code_verifier': code_verifier
        }

        # Make the token request
        token_response = requests.post(
            app.config['EPIC_TOKEN_URL'],
            data=token_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )
        
        # Check if the token request was successful
        if token_response.status_code != 200:
            error_data = token_response.json() if token_response.headers.get('content-type') == 'application/json' else {}
            error_message = error_data.get('error_description', f"Token request failed with status {token_response.status_code}")
            raise Exception(error_message)
        
        # Return the token information
        return token_response.json()