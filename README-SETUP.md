# Epic FHIR OAuth 2.0 Demo - Run Instructions

## Directory Structure Setup

First, create the following directory structure:

```
epic-fhir-oauth-demo/
├── backend/
└── frontend/
```

## Setting Up the Backend

1. Navigate to the backend directory:
```bash
cd epic-fhir-oauth-demo/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Copy all the backend files into the appropriate directory structure.

5. Install the dependencies:
```bash
pip install -r requirements.txt
```

6. Create a `.env` file based on `.env.example` and fill in your Epic App Orchard credentials:
```bash
cp .env.example .env
```

7. Edit the `.env` file to add your credentials:
```
FLASK_SECRET_KEY=your_secure_random_key_here
EPIC_CLIENT_ID=your_epic_client_id
EPIC_CLIENT_SECRET=your_epic_client_secret
FRONTEND_URL=http://localhost:3000
```

## Setting Up the Frontend

1. Navigate to the frontend directory:
```bash
cd epic-fhir-oauth-demo/frontend
```

2. Copy all the frontend files into the appropriate directory structure.

3. Install the dependencies:
```bash
npm install
```

## Running the Application

1. Start the backend server:
   - In the backend directory with the virtual environment activated:
   ```bash
   python app.py
   ```
   - The Flask server will start at http://localhost:5001

2. Start the frontend development server:
   - In the frontend directory:
   ```bash
   npm start
   ```
   - The React app will open at http://localhost:3000

3. Open your browser and navigate to http://localhost:3000 to use the application.

## VSCode Setup Tips

1. Install these extensions for better development experience:
   - Python
   - Pylance
   - ESLint
   - Prettier

2. Create a `.vscode/settings.json` file in the project root with these settings:
```json
{
  "editor.formatOnSave": true,
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.analysis.extraPaths": ["./backend"],
  "eslint.workingDirectories": ["./frontend"]
}
```

3. Use VSCode's integrated terminal to run separate terminals for the backend and frontend.

## Troubleshooting

1. **Backend Port Already in Use**: If port 5000 is already in use, edit `app.py` to change the port.

2. **CORS Issues**: If you encounter CORS errors, check that your CORS configuration in the Flask backend is correct. The current configuration allows requests from http://localhost:3000.

3. **Authentication Issues**: Ensure your Epic App Orchard credentials are correct and that your redirect URI matches exactly what's registered in Epic App Orchard.