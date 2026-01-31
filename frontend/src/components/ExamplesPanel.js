import { useState } from 'react';
import { useStore } from '../store';
import { pipelineExamples } from '../examples/pipelineExamples';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Play, 
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';

export const ExamplesPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('valid');
  const setNodes = useStore(state => state.setNodes);
  const setEdges = useStore(state => state.setEdges);

  const loadExample = (example) => {
    // Clear current pipeline and load example
    setNodes(example.nodes);
    setEdges(example.edges);
    
    // Show success message
    const message = `Loaded example: "${example.name}"\n\n${example.description}\n\nYou can now click "Submit Pipeline" to test DAG validation!`;
    alert(message);
  };

  const clearPipeline = () => {
    setNodes([]);
    setEdges([]);
    alert('Pipeline cleared! You can now build your own or load another example.');
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '350px',
      maxHeight: isExpanded ? '80vh' : '60px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div 
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: isExpanded ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={16} color="white" />
          </div>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              Example Pipelines
            </h3>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Test DAG validation
            </p>
          </div>
        </div>
        
        <div style={{ color: '#6b7280' }}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div style={{ padding: '0 20px 20px 20px' }}>
          {/* Info Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <Lightbulb size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: '#1e40af', lineHeight: '1.4' }}>
              Load examples to see how DAG validation works. Valid pipelines have no cycles, invalid ones do.
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            marginBottom: '16px',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button
              onClick={() => setActiveCategory('valid')}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === 'valid' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                  : 'transparent',
                color: activeCategory === 'valid' ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <CheckCircle size={14} />
              Valid DAGs
            </button>
            <button
              onClick={() => setActiveCategory('invalid')}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === 'invalid' 
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
                  : 'transparent',
                color: activeCategory === 'invalid' ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <XCircle size={14} />
              Invalid DAGs
            </button>
          </div>

          {/* Examples List */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '16px'
          }}>
            {pipelineExamples[activeCategory].map((example) => (
              <div
                key={example.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => loadExample(example)}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <h4 style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {example.name}
                  </h4>
                  <Play size={14} color="#6b7280" />
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: '1.3'
                }}>
                  {example.description}
                </p>
                <div style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  color: '#9ca3af',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <span>{example.nodes.length} nodes</span>
                  <span>{example.edges.length} edges</span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={clearPipeline}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: 'rgba(107, 114, 128, 0.1)',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(107, 114, 128, 0.2)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <RotateCcw size={14} />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};