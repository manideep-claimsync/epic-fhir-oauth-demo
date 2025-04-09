# backend/app.py
from flask import Flask
from flask_cors import CORS
from routes import register_routes
from config import Config

def create_app(config_class=Config):
    """Application factory function"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize CORS
    CORS(app, supports_credentials=True)
    
    # Register all routes
    register_routes(app)
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Simple health check endpoint"""
        return {'status': 'healthy'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5001, debug=True)