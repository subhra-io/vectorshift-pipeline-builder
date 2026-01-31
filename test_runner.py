#!/usr/bin/env python3
"""
Comprehensive test runner for VectorShift Pipeline Builder
Runs all DAG validation tests and provides detailed reporting
"""

import subprocess
import sys
import time
import requests
from pathlib import Path

def check_server_health(url, timeout=30):
    """Check if server is running and healthy"""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                return True
        except requests.exceptions.RequestException:
            pass
        time.sleep(1)
    return False

def run_backend_tests():
    """Run backend DAG validation tests"""
    print("Running Backend DAG Validation Tests...")
    print("=" * 60)
    
    # Check if backend is running
    if not check_server_health("http://localhost:8000", timeout=5):
        print("ERROR: Backend server is not running!")
        print("   Please start the backend with: cd backend && uvicorn main:app --reload")
        return False
    
    print("Backend server is running")
    
    # Run the tests
    try:
        result = subprocess.run([
            sys.executable, "backend/test_dag_validation.py"
        ], capture_output=True, text=True, timeout=60)
        
        print(result.stdout)
        if result.stderr:
            print("Errors:", result.stderr)
        
        return result.returncode == 0
    except subprocess.TimeoutExpired:
        print("ERROR: Tests timed out")
        return False
    except Exception as e:
        print(f"ERROR: Error running tests: {e}")
        return False

def check_frontend_health():
    """Check if frontend is running"""
    print("\nChecking Frontend Status...")
    print("=" * 60)
    
    if check_server_health("http://localhost:3000", timeout=5):
        print("Frontend is running at http://localhost:3000")
        return True
    else:
        print("ERROR: Frontend is not running!")
        print("   Please start the frontend with: cd frontend && npm start")
        return False

def run_integration_tests():
    """Run integration tests between frontend and backend"""
    print("\nRunning Integration Tests...")
    print("=" * 60)
    
    test_cases = [
        {
            "name": "Empty Pipeline",
            "data": {"nodes": [], "edges": []},
            "expected": {"num_nodes": 0, "num_edges": 0, "is_dag": True}
        },
        {
            "name": "Valid Linear Pipeline",
            "data": {
                "nodes": [
                    {"id": "input-1", "type": "customInput", "position": {"x": 0, "y": 0}, "data": {}},
                    {"id": "output-1", "type": "customOutput", "position": {"x": 200, "y": 0}, "data": {}}
                ],
                "edges": [
                    {"id": "e1", "source": "input-1", "target": "output-1"}
                ]
            },
            "expected": {"num_nodes": 2, "num_edges": 1, "is_dag": True}
        },
        {
            "name": "Invalid Cycle",
            "data": {
                "nodes": [
                    {"id": "a", "type": "customInput", "position": {"x": 0, "y": 0}, "data": {}},
                    {"id": "b", "type": "customOutput", "position": {"x": 200, "y": 0}, "data": {}}
                ],
                "edges": [
                    {"id": "e1", "source": "a", "target": "b"},
                    {"id": "e2", "source": "b", "target": "a"}
                ]
            },
            "expected": {"num_nodes": 2, "num_edges": 2, "is_dag": False}
        }
    ]
    
    passed = 0
    failed = 0
    
    for test_case in test_cases:
        try:
            response = requests.post(
                "http://localhost:8000/pipelines/parse",
                json=test_case["data"],
                timeout=10
            )
            
            if response.status_code == 200:
                result = response.json()
                if result == test_case["expected"]:
                    print(f"PASS {test_case['name']}")
                    passed += 1
                else:
                    print(f"FAIL {test_case['name']}: Expected {test_case['expected']}, got {result}")
                    failed += 1
            else:
                print(f"FAIL {test_case['name']}: HTTP {response.status_code}")
                failed += 1
                
        except Exception as e:
            print(f"FAIL {test_case['name']}: {str(e)}")
            failed += 1
    
    print(f"\nIntegration Tests: {passed} passed, {failed} failed")
    return failed == 0

def print_example_usage():
    """Print usage examples for the application"""
    print("\nExample Usage Guide...")
    print("=" * 60)
    print("1. Open http://localhost:3000 in your browser")
    print("2. Click 'Example Pipelines' panel in the top-right corner")
    print("3. Try loading a 'Valid DAG' example:")
    print("   - Simple Linear Pipeline")
    print("   - Text Processing Pipeline")
    print("   - Branching Pipeline")
    print("4. Try loading an 'Invalid DAG' example:")
    print("   - Simple Cycle")
    print("   - Self Loop")
    print("   - Complex Cycle")
    print("5. Click 'Submit Pipeline' to test DAG validation")
    print("6. See the results in the alert popup")
    print("\nTips:")
    print("   - Valid DAGs show checkmark and can be executed")
    print("   - Invalid DAGs show X due to cycles")
    print("   - Build your own pipelines by dragging nodes from the palette")
    print("   - Connect nodes by dragging from output handles to input handles")

def main():
    """Main test runner"""
    print("VectorShift Pipeline Builder - Test Suite")
    print("=" * 60)
    print("Testing DAG validation functionality with comprehensive test cases")
    print()
    
    # Check if servers are running
    backend_ok = check_server_health("http://localhost:8000", timeout=2)
    frontend_ok = check_server_health("http://localhost:3000", timeout=2)
    
    if not backend_ok:
        print("WARNING: Backend server not detected. Starting test anyway...")
        print("   If tests fail, start backend with: cd backend && uvicorn main:app --reload")
        print()
    
    if not frontend_ok:
        print("WARNING: Frontend server not detected.")
        print("   Start frontend with: cd frontend && npm start")
        print()
    
    # Run backend tests
    backend_tests_passed = run_backend_tests()
    
    # Check frontend
    frontend_running = check_frontend_health()
    
    # Run integration tests if both servers are running
    integration_tests_passed = True
    if backend_ok:
        integration_tests_passed = run_integration_tests()
    
    # Print usage guide
    if frontend_running:
        print_example_usage()
    
    # Summary
    print("\nTest Summary")
    print("=" * 60)
    print(f"Backend Tests: {'PASSED' if backend_tests_passed else 'FAILED'}")
    print(f"Frontend Status: {'RUNNING' if frontend_running else 'NOT RUNNING'}")
    print(f"Integration Tests: {'PASSED' if integration_tests_passed else 'FAILED'}")
    
    if backend_tests_passed and frontend_running and integration_tests_passed:
        print("\nAll systems operational! Ready for demonstration.")
        print("   Open http://localhost:3000 to try the application")
    else:
        print("\nSome issues detected. Check the output above for details.")
    
    return backend_tests_passed and integration_tests_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)