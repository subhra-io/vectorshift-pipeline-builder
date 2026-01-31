# Complete Setup Instructions for VectorShift Pipeline Builder

## Overview
This guide will help you set up and run the VectorShift Pipeline Builder from source files only.

## Prerequisites Installation

### 1. Install Node.js
- Visit https://nodejs.org/
- Download and install the LTS version (v18 or higher recommended)
- Verify installation: `node --version` and `npm --version`

### 2. Install Python
- Visit https://python.org/
- Download and install Python 3.8 or higher
- Verify installation: `python --version` or `python3 --version`

## Project Setup from Source Files

### Step 1: Create Project Structure

```bash
mkdir vectorshift-pipeline-builder
cd vectorshift-pipeline-builder
```

### Step 2: Backend Setup

1. **Create backend directory:**
```bash
mkdir backend
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**

On macOS/Linux:
```bash
source venv/bin/activate
```

On Windows:
```bash
venv\Scripts\activate
```

4. **Install Python dependencies:**
```bash
pip install fastapi==0.104.1 uvicorn==0.24.0 pydantic==2.5.0
```

5. **Add backend source files:**
   - Copy `main.py` to `backend/main.py`
   - Copy `test_dag_validation.py` to `backend/test_dag_validation.py`

6. **Test backend setup:**
```bash
python -c "import fastapi, uvicorn, pydantic; print('All dependencies installed successfully')"
```

7. **Start backend server:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

Test the backend: Open http://localhost:8000 in your browser. You should see `{"Ping":"Pong"}`

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to project root:**
```bash
cd ..  # Go back to vectorshift-pipeline-builder directory
```

2. **Create React application:**
```bash
npx create-react-app frontend
cd frontend
```

3. **Install required React dependencies:**
```bash
npm install reactflow@11.10.1 zustand@4.4.7 lucide-react@0.294.0
```

4. **Replace the src directory:**
```bash
# Remove default src folder
rm -rf src/

# Create new src folder
mkdir src
```

5. **Add your source files to frontend/src/:**
   - Copy all files from your `frontend/src/` folder
   - Ensure you have these key files:
     - `App.js`
     - `index.js`
     - `index.css`
     - `store.js`
     - `ui.js`
     - `toolbar.js`
     - `submit.js`
     - `draggableNode.js`
     - `nodes/` folder with all node files
     - `components/` folder
     - `examples/` folder

6. **Verify package.json dependencies:**
Your `package.json` should include:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "reactflow": "^11.10.1",
    "zustand": "^4.4.7",
    "lucide-react": "^0.294.0"
  }
}
```

7. **Start the frontend:**
```bash
npm start
```

The application should open at http://localhost:3000

### Step 4: Add Test Runner

1. **In the project root directory, add test_runner.py:**
```bash
cd ..  # Go back to project root
# Copy test_runner.py to the root directory
```

2. **Run tests:**
```bash
python test_runner.py
```

## Verification Steps

### 1. Backend Verification
- Visit http://localhost:8000 → Should show `{"Ping":"Pong"}`
- Visit http://localhost:8000/docs → Should show FastAPI documentation

### 2. Frontend Verification
- Visit http://localhost:3000 → Should show the pipeline builder interface
- Try dragging nodes from the toolbar
- Try connecting nodes
- Click "Submit Pipeline" to test backend communication

### 3. Integration Test
- Build a simple pipeline (Input → Output)
- Click "Submit Pipeline"
- Should see an alert with pipeline analysis results

## Troubleshooting

### Backend Issues

**Error: "ModuleNotFoundError: No module named 'fastapi'"**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn pydantic
```

**Error: "Port 8000 is already in use"**
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9
# Or use a different port
uvicorn main:app --reload --port 8001
```

### Frontend Issues

**Error: "Module not found: Can't resolve 'reactflow'"**
```bash
cd frontend
npm install reactflow zustand lucide-react
```

**Error: "Cannot find module './store'"**
- Ensure all source files are in `frontend/src/`
- Check file names match exactly (case-sensitive)

**CORS Error when submitting pipeline:**
- Ensure backend is running on port 8000
- Check that CORS middleware is configured in `main.py`

### General Issues

**Python command not found:**
- Try `python3` instead of `python`
- Ensure Python is added to your PATH

**npm command not found:**
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal

## File Structure Reference

Your final project structure should look like:

```
vectorshift-pipeline-builder/
├── backend/
│   ├── venv/
│   ├── main.py
│   └── test_dag_validation.py
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ExamplesPanel.js
│   │   ├── examples/
│   │   │   └── pipelineExamples.js
│   │   ├── nodes/
│   │   │   ├── BaseNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── textNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── mathNode.js
│   │   │   ├── filterNode.js
│   │   │   ├── transformNode.js
│   │   │   ├── delayNode.js
│   │   │   └── apiNode.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── store.js
│   │   ├── ui.js
│   │   ├── toolbar.js
│   │   ├── submit.js
│   │   └── draggableNode.js
│   ├── package.json
│   └── package-lock.json
└── test_runner.py
```

## Success Indicators

When everything is working correctly:

1. **Backend**: http://localhost:8000 shows `{"Ping":"Pong"}`
2. **Frontend**: http://localhost:3000 shows the pipeline builder
3. **Tests**: `python test_runner.py` shows all tests passing
4. **Integration**: You can build pipelines and submit them for validation

## Support

If you encounter issues:
1. Check that all prerequisites are installed
2. Verify file structure matches the reference
3. Ensure both backend and frontend are running
4. Check browser console for JavaScript errors
5. Check terminal for Python/Node.js errors