# backend/config.py
import os
import secrets
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration settings for the application"""
    # Flask settings
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', secrets.token_hex(16))
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Epic FHIR OAuth settings
    EPIC_CLIENT_ID = os.getenv('EPIC_CLIENT_ID')
    EPIC_CLIENT_SECRET = os.getenv('EPIC_CLIENT_SECRET')
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    EPIC_REDIRECT_URI = os.getenv('EPIC_REDIRECT_URI', 'http://localhost:5001/api/auth/callback')
    
    # Epic API endpoints
    EPIC_AUTH_URL = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize'
    EPIC_TOKEN_URL = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token'
    EPIC_FHIR_API_URL = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4'