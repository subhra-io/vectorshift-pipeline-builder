from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)
    using DFS-based cycle detection.
    """
    # Build adjacency list
    graph = {}
    node_ids = {node.id for node in nodes}
    
    # Initialize graph with all nodes
    for node in nodes:
        graph[node.id] = []
    
    # Add edges to graph
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
    
    # DFS-based cycle detection
    # 0: unvisited, 1: visiting (in current path), 2: visited (completed)
    color = {node_id: 0 for node_id in node_ids}
    
    def has_cycle_dfs(node_id: str) -> bool:
        if color[node_id] == 1:  # Back edge found - cycle detected
            return True
        if color[node_id] == 2:  # Already processed
            return False
        
        color[node_id] = 1  # Mark as visiting
        
        # Check all neighbors
        for neighbor in graph[node_id]:
            if has_cycle_dfs(neighbor):
                return True
        
        color[node_id] = 2  # Mark as completed
        return False
    
    # Check for cycles starting from each unvisited node
    for node_id in node_ids:
        if color[node_id] == 0:
            if has_cycle_dfs(node_id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing pipeline: {str(e)}")
