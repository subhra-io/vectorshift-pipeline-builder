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

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Run Tests
```bash
python test_runner.py
```

## Usage

1. Open http://localhost:3000
2. Drag nodes from the toolbar to build your pipeline
3. Connect nodes by dragging from output handles to input handles
4. Click "Submit Pipeline" to validate your DAG
5. Try the example pipelines to learn DAG concepts

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

## License

MIT License