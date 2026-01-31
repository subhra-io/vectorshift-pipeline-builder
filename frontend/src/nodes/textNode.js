import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 'auto' });
  const textareaRef = useRef(null);

  // Extract variables from text
  useEffect(() => {
    const variableRegex = /\{\{(\s*\w+\s*)\}\}/g;
    const foundVariables = [];
    let match;
    
    while ((match = variableRegex.exec(currText)) !== null) {
      const variableName = match[1].trim();
      if (variableName && !foundVariables.includes(variableName)) {
        foundVariables.push(variableName);
      }
    }
    
    setVariables(foundVariables);
  }, [currText]);

  // Auto-resize functionality
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate new dimensions based on content
      const newHeight = Math.max(60, textarea.scrollHeight + 20);
      const textLength = currText.length;
      const newWidth = Math.max(200, Math.min(400, 200 + textLength * 2));
      
      setDimensions({
        width: newWidth,
        height: newHeight
      });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create handles for variables
  const handles = [
    // Variable input handles (left side)
    ...variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { 
        top: `${20 + (index * 30)}px`,
        backgroundColor: '#10b981'
      }
    })),
    // Output handle (right side)
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      style={{ 
        width: dimensions.width,
        height: dimensions.height,
        minHeight: 120
      }}
    >
      <div style={{ marginBottom: '8px', zIndex: 1, position: 'relative' }}>
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '6px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
          Text Content:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{variable_name}}"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'none',
            fontFamily: 'Inter, monospace',
            minHeight: '70px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#374151',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
          }}
        />
      </div>
      
      {/* Display detected variables */}
      {variables.length > 0 && (
        <div style={{
          fontSize: '12px',
          color: '#ffffff',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '8px 12px',
          borderRadius: '8px',
          marginTop: '8px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}>
          <strong>Variables:</strong> {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
