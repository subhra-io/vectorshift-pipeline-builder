import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Send, Loader } from 'lucide-react';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results in alert
            const message = `Pipeline Analysis Results:
            
Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Valid DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag ? 
    'Your pipeline is a valid Directed Acyclic Graph and ready for execution!' : 
    'Warning: Your pipeline contains cycles and cannot be executed as a DAG.'}`;

            alert(message);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '24px 32px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            gap: '16px'
        }}>
            <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: nodes.length > 0 ? '#10b981' : '#6b7280'
                }} />
                {nodes.length} nodes, {edges.length} connections
            </div>
            
            <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={isLoading || nodes.length === 0}
                style={{
                    background: isLoading 
                        ? 'rgba(107, 114, 128, 0.8)' 
                        : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: isLoading || nodes.length === 0 
                        ? 'none' 
                        : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '14px 28px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading || nodes.length === 0 ? 'not-allowed' : 'pointer',
                    boxShadow: isLoading || nodes.length === 0 
                        ? 'none' 
                        : '0 8px 25px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    opacity: nodes.length === 0 ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                    if (!isLoading && nodes.length > 0) {
                        e.target.style.transform = 'translateY(-2px) scale(1.02)';
                        e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading && nodes.length > 0) {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)';
                    }
                }}
            >
                {isLoading ? (
                    <>
                        <Loader size={18} className="animate-spin" style={{
                            animation: 'spin 1s linear infinite'
                        }} />
                        Analyzing...
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        Submit Pipeline
                    </>
                )}
            </button>
            
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
