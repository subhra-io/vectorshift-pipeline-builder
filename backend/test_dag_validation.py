#!/usr/bin/env python3
"""
Test cases for DAG validation in VectorShift Pipeline Builder
Tests both valid DAG cases and cycle detection scenarios
"""

import requests
import json
from typing import List, Dict, Any

# Test server URL
BASE_URL = "http://localhost:8000"

def create_node(node_id: str, node_type: str, x: float = 0, y: float = 0) -> Dict[str, Any]:
    """Helper function to create a test node"""
    return {
        "id": node_id,
        "type": node_type,
        "position": {"x": x, "y": y},
        "data": {"nodeType": node_type}
    }

def create_edge(edge_id: str, source: str, target: str, source_handle: str = None, target_handle: str = None) -> Dict[str, Any]:
    """Helper function to create a test edge"""
    edge = {
        "id": edge_id,
        "source": source,
        "target": target
    }
    if source_handle:
        edge["sourceHandle"] = source_handle
    if target_handle:
        edge["targetHandle"] = target_handle
    return edge

class TestDAGValidation:
    """Test cases for DAG validation functionality"""
    
    def test_empty_pipeline(self):
        """Test empty pipeline - should be valid DAG"""
        pipeline = {
            "nodes": [],
            "edges": []
        }
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 0
        assert result["num_edges"] == 0
        assert result["is_dag"] == True
    
    def test_single_node(self):
        """Test single node - should be valid DAG"""
        pipeline = {
            "nodes": [create_node("input-1", "customInput")],
            "edges": []
        }
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 1
        assert result["num_edges"] == 0
        assert result["is_dag"] == True
    
    def test_linear_pipeline_valid(self):
        """Test linear pipeline: Input -> LLM -> Output (Valid DAG)"""
        nodes = [
            create_node("input-1", "customInput", 0, 0),
            create_node("llm-1", "llm", 200, 0),
            create_node("output-1", "customOutput", 400, 0)
        ]
        
        edges = [
            create_edge("e1", "input-1", "llm-1"),
            create_edge("e2", "llm-1", "output-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 3
        assert result["num_edges"] == 2
        assert result["is_dag"] == True
    
    def test_branching_pipeline_valid(self):
        """Test branching pipeline: Input -> [Math, Filter] -> Output (Valid DAG)"""
        nodes = [
            create_node("input-1", "customInput", 0, 0),
            create_node("math-1", "math", 200, -50),
            create_node("filter-1", "filter", 200, 50),
            create_node("output-1", "customOutput", 400, 0)
        ]
        
        edges = [
            create_edge("e1", "input-1", "math-1"),
            create_edge("e2", "input-1", "filter-1"),
            create_edge("e3", "math-1", "output-1"),
            create_edge("e4", "filter-1", "output-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 4
        assert result["num_edges"] == 4
        assert result["is_dag"] == True
    
    def test_complex_valid_dag(self):
        """Test complex valid DAG with multiple paths"""
        nodes = [
            create_node("input-1", "customInput", 0, 0),
            create_node("text-1", "text", 200, -100),
            create_node("math-1", "math", 200, 0),
            create_node("filter-1", "filter", 200, 100),
            create_node("transform-1", "transform", 400, -50),
            create_node("llm-1", "llm", 400, 50),
            create_node("output-1", "customOutput", 600, 0)
        ]
        
        edges = [
            create_edge("e1", "input-1", "text-1"),
            create_edge("e2", "input-1", "math-1"),
            create_edge("e3", "input-1", "filter-1"),
            create_edge("e4", "text-1", "transform-1"),
            create_edge("e5", "math-1", "transform-1"),
            create_edge("e6", "filter-1", "llm-1"),
            create_edge("e7", "transform-1", "output-1"),
            create_edge("e8", "llm-1", "output-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 7
        assert result["num_edges"] == 8
        assert result["is_dag"] == True
    
    def test_simple_cycle_invalid(self):
        """Test simple cycle: A -> B -> A (Invalid DAG)"""
        nodes = [
            create_node("input-1", "customInput", 0, 0),
            create_node("output-1", "customOutput", 200, 0)
        ]
        
        edges = [
            create_edge("e1", "input-1", "output-1"),
            create_edge("e2", "output-1", "input-1")  # Creates cycle
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 2
        assert result["num_edges"] == 2
        assert result["is_dag"] == False
    
    def test_self_loop_invalid(self):
        """Test self-loop: A -> A (Invalid DAG)"""
        nodes = [
            create_node("math-1", "math", 0, 0)
        ]
        
        edges = [
            create_edge("e1", "math-1", "math-1")  # Self-loop
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 1
        assert result["num_edges"] == 1
        assert result["is_dag"] == False
    
    def test_complex_cycle_invalid(self):
        """Test complex cycle: A -> B -> C -> D -> B (Invalid DAG)"""
        nodes = [
            create_node("input-1", "customInput", 0, 0),
            create_node("math-1", "math", 200, 0),
            create_node("filter-1", "filter", 400, 0),
            create_node("transform-1", "transform", 600, 0),
            create_node("output-1", "customOutput", 800, 0)
        ]
        
        edges = [
            create_edge("e1", "input-1", "math-1"),
            create_edge("e2", "math-1", "filter-1"),
            create_edge("e3", "filter-1", "transform-1"),
            create_edge("e4", "transform-1", "math-1"),  # Creates cycle: math -> filter -> transform -> math
            create_edge("e5", "transform-1", "output-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 5
        assert result["num_edges"] == 5
        assert result["is_dag"] == False
    
    def test_disconnected_components_valid(self):
        """Test disconnected components - should be valid DAG"""
        nodes = [
            # Component 1: Input -> Math -> Output
            create_node("input-1", "customInput", 0, 0),
            create_node("math-1", "math", 200, 0),
            create_node("output-1", "customOutput", 400, 0),
            # Component 2: Text -> Filter (disconnected)
            create_node("text-1", "text", 0, 200),
            create_node("filter-1", "filter", 200, 200)
        ]
        
        edges = [
            create_edge("e1", "input-1", "math-1"),
            create_edge("e2", "math-1", "output-1"),
            create_edge("e3", "text-1", "filter-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 5
        assert result["num_edges"] == 3
        assert result["is_dag"] == True
    
    def test_multiple_cycles_invalid(self):
        """Test multiple cycles in different components (Invalid DAG)"""
        nodes = [
            # Cycle 1: A -> B -> A
            create_node("input-1", "customInput", 0, 0),
            create_node("math-1", "math", 200, 0),
            # Cycle 2: C -> D -> C
            create_node("filter-1", "filter", 0, 200),
            create_node("transform-1", "transform", 200, 200)
        ]
        
        edges = [
            # First cycle
            create_edge("e1", "input-1", "math-1"),
            create_edge("e2", "math-1", "input-1"),
            # Second cycle
            create_edge("e3", "filter-1", "transform-1"),
            create_edge("e4", "transform-1", "filter-1")
        ]
        
        pipeline = {"nodes": nodes, "edges": edges}
        
        response = requests.post(f"{BASE_URL}/pipelines/parse", json=pipeline)
        assert response.status_code == 200
        
        result = response.json()
        assert result["num_nodes"] == 4
        assert result["num_edges"] == 4
        assert result["is_dag"] == False

def run_manual_tests():
    """Run tests manually without pytest"""
    test_instance = TestDAGValidation()
    
    tests = [
        ("Empty Pipeline", test_instance.test_empty_pipeline),
        ("Single Node", test_instance.test_single_node),
        ("Linear Pipeline (Valid)", test_instance.test_linear_pipeline_valid),
        ("Branching Pipeline (Valid)", test_instance.test_branching_pipeline_valid),
        ("Complex Valid DAG", test_instance.test_complex_valid_dag),
        ("Simple Cycle (Invalid)", test_instance.test_simple_cycle_invalid),
        ("Self Loop (Invalid)", test_instance.test_self_loop_invalid),
        ("Complex Cycle (Invalid)", test_instance.test_complex_cycle_invalid),
        ("Disconnected Components (Valid)", test_instance.test_disconnected_components_valid),
        ("Multiple Cycles (Invalid)", test_instance.test_multiple_cycles_invalid)
    ]
    
    print("Running DAG Validation Tests...")
    print("=" * 50)
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        try:
            test_func()
            print(f"PASS {test_name}")
            passed += 1
        except Exception as e:
            print(f"FAIL {test_name}: {str(e)}")
            failed += 1
    
    print("=" * 50)
    print(f"Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("All tests passed!")
    else:
        print(f"{failed} tests failed")

if __name__ == "__main__":
    run_manual_tests()