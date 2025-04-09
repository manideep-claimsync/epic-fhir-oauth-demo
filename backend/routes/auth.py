# backend/routes/auth.py
from flask import Blueprint, jsonify, session, redirect, request
from services.epic_oauth import EpicOAuthService
from utils.security import validate_state
from flask import current_app as app

auth_bp = Blueprint('auth', __name__)
oauth_service = EpicOAuthService()

@auth_bp.route('/login', methods=['GET'])
def login():
    """Initiate the OAuth 2.0 authorization flow with Epic"""
    auth_url, state, code_verifier = oauth_service.create_authorization_url()
    
    # Store state and code verifier in session
    session['oauth_state'] = state
    session['code_verifier'] = code_verifier
    
    return jsonify({'auth_url': auth_url})

@auth_bp.route('/exchange', methods=['POST'])
def exchange_code():
    """Exchange authorization code sent from frontend"""
    data = request.json
    code = data.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400
    
    try:
        # Get the code verifier from the session
        code_verifier = session.get('code_verifier')
        
        if not code_verifier:
            # If no code verifier in session, create a new one
            # This can happen if the session expired or if the flow started elsewhere
            code_verifier = oauth_service.generate_new_code_verifier()
            session['code_verifier'] = code_verifier
        
        # Exchange the code for tokens
        token_info = oauth_service.exchange_code_for_token(code, code_verifier)
        print(token_info)
        
        # Store the tokens in the session
        session['access_token'] = token_info.get('access_token')
        session['refresh_token'] = token_info.get('refresh_token')
        session['expires_in'] = token_info.get('expires_in')
        
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error exchanging code: {e}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/callback', methods=['GET'])
def callback():
    """
    Handle the OAuth callback from Epic
    Note: This route is kept for backwards compatibility but may not be used
    if Epic redirects directly to the frontend
    """
    # Get the authorization code from the request
    code = request.args.get('code')
    state = request.args.get('state')
    
    # Validate the state parameter to prevent CSRF
    if not validate_state(state, session.get('oauth_state')):
        return redirect(f"{app.config['FRONTEND_URL']}?error=invalid_state")
    
    # Exchange the code for an access token
    try:
        # Get the code verifier from the session
        code_verifier = session.get('code_verifier')
        
        # Exchange code for token
        token_info = oauth_service.exchange_code_for_token(code, code_verifier)
        
        # Store the tokens in the session
        session['access_token'] = token_info.get('access_token')
        session['refresh_token'] = token_info.get('refresh_token')
        session['expires_in'] = token_info.get('expires_in')
        
        # Redirect back to the frontend with a success parameter
        return redirect(f"{app.config['FRONTEND_URL']}?auth=success")
        
    except Exception as e:
        # Handle any exceptions
        print(f"Error exchanging code for token: {e}")
        return redirect(f"{app.config['FRONTEND_URL']}?error=server_error")

@auth_bp.route('/token', methods=['GET'])
def get_token():
    """Return the current access token to the frontend"""
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({'authenticated': False}), 401
    
    return jsonify({
        'authenticated': True,
        'access_token': access_token
    })

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Log out the user by clearing the session"""
    session.clear()
    return jsonify({'success': True})