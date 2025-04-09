# backend/routes/__init__.py
from .auth import auth_bp
from .patient import patient_bp

def register_routes(app):
    """Register all route blueprints with the app"""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patient_bp, url_prefix='/api/patient')