# VectorShift Pipeline Builder

A modern, full-stack pipeline builder application with drag-and-drop interface and DAG validation.

## Features

- **Visual Pipeline Builder**: Drag-and-drop interface using React Flow
- **9 Node Types**: Input, Output, Text, LLM, Math, Filter, Transform, Delay, API
- **DAG Validation**: Real-time cycle detection and validation
- **Modern UI**: Glassmorphism design with responsive layout
- **Example Pipelines**: Pre-built examples for learning and testing
- **Comprehensive Testing**: Backend and integration test suites

## Tech Stack

- **Frontend**: React, React Flow, Zustand, Lucide React
- **Backend**: FastAPI, Python
- **Styling**: CSS-in-JS with modern glassmorphism effects

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **npm** (comes with Node.js)

## Complete Setup Instructions

### Step 1: Project Structure Setup

Create the following folder structure:
```
vectorshift-pipeline-builder/
├── backend/
├── frontend/
└── test_runner.py
```

### Step 2: Backend Setup

1. **Create backend directory and navigate to it:**
```bash
mkdir -p backend
cd backend
```

2. **Create Python virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**
```bash
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

4. **Install required packages:**
```bash
pip install fastapi uvicorn pydantic
```

5. **Add your backend source files:**
   - Place `main.py` in the `backend/` directory
   - Place `test_dag_validation.py` in the `backend/` directory

6. **Start the backend server:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be running at: http://localhost:8000

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to project root:**
```bash
cd ../  # Go back to project root
```

2. **Create React app:**
```bash
npx create-react-app frontend
cd frontend
```

3. **Install required dependencies:**
```bash
npm install reactflow zustand lucide-react
```

4. **Replace the default src folder:**
   - Delete the existing `src/` folder: `rm -rf src/`
   - Create new `src/` folder: `mkdir src`
   - Add all your source files to `frontend/src/`

5. **Update package.json (if needed):**
   Make sure your `package.json` includes these dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "reactflow": "^11.10.1",
    "zustand": "^4.4.7",
    "lucide-react": "^0.294.0"
  }
}
```

6. **Start the frontend:**
```bash
npm start
```

The frontend will be running at: http://localhost:3000

### Step 4: Run Tests

1. **In the project root directory, add the test_runner.py file**

2. **Run the comprehensive test suite:**
```bash
python test_runner.py
```

## Alternative Quick Setup (If you have the complete source)

If you have all source files ready:

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

## Usage

1. Open http://localhost:3000
2. Drag nodes from the toolbar to build your pipeline
3. Connect nodes by dragging from output handles to input handles
4. Click "Submit Pipeline" to validate your DAG
5. Try the example pipelines to learn DAG concepts

## Helper Files for Setup

- **SETUP.md**: Comprehensive step-by-step setup instructions
- **frontend-package.json**: Template package.json for the React app
- **backend-requirements.txt**: Python dependencies list

## Architecture

- **BaseNode**: Reusable abstraction for all node types
- **DAG Validation**: DFS-based cycle detection algorithm
- **State Management**: Zustand for React state
- **API Integration**: RESTful backend communication

## Testing

- 10 backend DAG validation tests
- 3 integration tests
- Example pipeline validation
- Comprehensive error handling

## File Structure

```
vectorshift-pipeline-builder/
├── backend/
│   ├── main.py
│   └── test_dag_validation.py
├── frontend/
│   └── src/
│       ├── components/
│       ├── examples/
│       ├── nodes/
│       └── [other React files]
└── test_runner.py
```

## License

MIT License