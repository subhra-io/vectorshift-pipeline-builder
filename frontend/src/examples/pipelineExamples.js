export const pipelineExamples = {
  valid: [
    {
      id: 'simple-linear',
      name: 'Simple Linear Pipeline',
      description: 'Basic Input → LLM → Output flow',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 100, y: 200 },
          data: { nodeType: 'customInput', inputName: 'user_query', inputType: 'Text' }
        },
        {
          id: 'llm-1',
          type: 'llm',
          position: { x: 350, y: 200 },
          data: { nodeType: 'llm' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 600, y: 200 },
          data: { nodeType: 'customOutput', outputName: 'response', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'llm-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'llm-1-prompt',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'llm-1',
          target: 'output-1',
          sourceHandle: 'llm-1-response',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ]
    },
    {
      id: 'text-processing',
      name: 'Text Processing Pipeline',
      description: 'Input → Text Template → Transform → Output',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 50, y: 200 },
          data: { nodeType: 'customInput', inputName: 'raw_data', inputType: 'Text' }
        },
        {
          id: 'text-1',
          type: 'text',
          position: { x: 250, y: 200 },
          data: { nodeType: 'text', text: 'Processing: {{input_data}}' }
        },
        {
          id: 'transform-1',
          type: 'transform',
          position: { x: 450, y: 200 },
          data: { nodeType: 'transform', transformation: 'uppercase' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 650, y: 200 },
          data: { nodeType: 'customOutput', outputName: 'processed_text', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'text-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'text-1-input_data',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'text-1',
          target: 'transform-1',
          sourceHandle: 'text-1-output',
          targetHandle: 'transform-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e3',
          source: 'transform-1',
          target: 'output-1',
          sourceHandle: 'transform-1-output',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ]
    },
    {
      id: 'branching-pipeline',
      name: 'Branching Pipeline',
      description: 'Input splits to Math and Filter, then converges to Output',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 50, y: 250 },
          data: { nodeType: 'customInput', inputName: 'numbers', inputType: 'Text' }
        },
        {
          id: 'math-1',
          type: 'math',
          position: { x: 250, y: 150 },
          data: { nodeType: 'math', operation: 'multiply' }
        },
        {
          id: 'filter-1',
          type: 'filter',
          position: { x: 250, y: 350 },
          data: { nodeType: 'filter', condition: 'contains', value: 'positive' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 500, y: 250 },
          data: { nodeType: 'customOutput', outputName: 'result', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'math-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'math-1-a',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'input-1',
          target: 'filter-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'filter-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e3',
          source: 'math-1',
          target: 'output-1',
          sourceHandle: 'math-1-result',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e4',
          source: 'filter-1',
          target: 'output-1',
          sourceHandle: 'filter-1-passed',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ]
    },
    {
      id: 'complex-valid',
      name: 'Complex Valid DAG',
      description: 'Multi-path processing with API integration',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 50, y: 200 },
          data: { nodeType: 'customInput', inputName: 'user_request', inputType: 'Text' }
        },
        {
          id: 'text-1',
          type: 'text',
          position: { x: 200, y: 100 },
          data: { nodeType: 'text', text: 'Query: {{request}}' }
        },
        {
          id: 'api-1',
          type: 'api',
          position: { x: 200, y: 300 },
          data: { nodeType: 'api', method: 'POST', url: 'https://api.example.com/process' }
        },
        {
          id: 'delay-1',
          type: 'delay',
          position: { x: 400, y: 100 },
          data: { nodeType: 'delay', duration: 1000, unit: 'ms' }
        },
        {
          id: 'llm-1',
          type: 'llm',
          position: { x: 400, y: 300 },
          data: { nodeType: 'llm' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 600, y: 200 },
          data: { nodeType: 'customOutput', outputName: 'final_result', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'text-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'text-1-request',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'input-1',
          target: 'api-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'api-1-body',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e3',
          source: 'text-1',
          target: 'delay-1',
          sourceHandle: 'text-1-output',
          targetHandle: 'delay-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e4',
          source: 'api-1',
          target: 'llm-1',
          sourceHandle: 'api-1-response',
          targetHandle: 'llm-1-prompt',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e5',
          source: 'delay-1',
          target: 'output-1',
          sourceHandle: 'delay-1-output',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e6',
          source: 'llm-1',
          target: 'output-1',
          sourceHandle: 'llm-1-response',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ]
    }
  ],
  invalid: [
    {
      id: 'simple-cycle',
      name: 'Simple Cycle',
      description: 'Input → Output → Input (creates a cycle)',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 200, y: 150 },
          data: { nodeType: 'customInput', inputName: 'data', inputType: 'Text' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 400, y: 150 },
          data: { nodeType: 'customOutput', outputName: 'result', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'output-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'output-1',
          target: 'input-1',
          sourceHandle: 'output-1-value',
          targetHandle: 'input-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' },
          style: { stroke: '#ef4444', strokeWidth: 3 }
        }
      ]
    },
    {
      id: 'self-loop',
      name: 'Self Loop',
      description: 'Math node connects to itself',
      nodes: [
        {
          id: 'math-1',
          type: 'math',
          position: { x: 300, y: 200 },
          data: { nodeType: 'math', operation: 'add' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'math-1',
          target: 'math-1',
          sourceHandle: 'math-1-result',
          targetHandle: 'math-1-a',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' },
          style: { stroke: '#ef4444', strokeWidth: 3 }
        }
      ]
    },
    {
      id: 'complex-cycle',
      name: 'Complex Cycle',
      description: 'Math → Filter → Transform → Math (creates a cycle)',
      nodes: [
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 50, y: 200 },
          data: { nodeType: 'customInput', inputName: 'data', inputType: 'Text' }
        },
        {
          id: 'math-1',
          type: 'math',
          position: { x: 200, y: 200 },
          data: { nodeType: 'math', operation: 'multiply' }
        },
        {
          id: 'filter-1',
          type: 'filter',
          position: { x: 350, y: 200 },
          data: { nodeType: 'filter', condition: 'contains', value: 'test' }
        },
        {
          id: 'transform-1',
          type: 'transform',
          position: { x: 500, y: 200 },
          data: { nodeType: 'transform', transformation: 'uppercase' }
        },
        {
          id: 'output-1',
          type: 'customOutput',
          position: { x: 650, y: 200 },
          data: { nodeType: 'customOutput', outputName: 'result', outputType: 'Text' }
        }
      ],
      edges: [
        {
          id: 'e1',
          source: 'input-1',
          target: 'math-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'math-1-a',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'math-1',
          target: 'filter-1',
          sourceHandle: 'math-1-result',
          targetHandle: 'filter-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e3',
          source: 'filter-1',
          target: 'transform-1',
          sourceHandle: 'filter-1-passed',
          targetHandle: 'transform-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e4',
          source: 'transform-1',
          target: 'math-1',
          sourceHandle: 'transform-1-output',
          targetHandle: 'math-1-b',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' },
          style: { stroke: '#ef4444', strokeWidth: 3 }
        },
        {
          id: 'e5',
          source: 'transform-1',
          target: 'output-1',
          sourceHandle: 'transform-1-output',
          targetHandle: 'output-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ]
    },
    {
      id: 'multiple-cycles',
      name: 'Multiple Cycles',
      description: 'Two separate cycles in the same pipeline',
      nodes: [
        // First cycle: Input ↔ Math
        {
          id: 'input-1',
          type: 'customInput',
          position: { x: 100, y: 100 },
          data: { nodeType: 'customInput', inputName: 'data1', inputType: 'Text' }
        },
        {
          id: 'math-1',
          type: 'math',
          position: { x: 300, y: 100 },
          data: { nodeType: 'math', operation: 'add' }
        },
        // Second cycle: Filter ↔ Transform
        {
          id: 'filter-1',
          type: 'filter',
          position: { x: 100, y: 300 },
          data: { nodeType: 'filter', condition: 'equals', value: 'test' }
        },
        {
          id: 'transform-1',
          type: 'transform',
          position: { x: 300, y: 300 },
          data: { nodeType: 'transform', transformation: 'lowercase' }
        }
      ],
      edges: [
        // First cycle
        {
          id: 'e1',
          source: 'input-1',
          target: 'math-1',
          sourceHandle: 'input-1-value',
          targetHandle: 'math-1-a',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e2',
          source: 'math-1',
          target: 'input-1',
          sourceHandle: 'math-1-result',
          targetHandle: 'input-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' },
          style: { stroke: '#ef4444', strokeWidth: 3 }
        },
        // Second cycle
        {
          id: 'e3',
          source: 'filter-1',
          target: 'transform-1',
          sourceHandle: 'filter-1-passed',
          targetHandle: 'transform-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e4',
          source: 'transform-1',
          target: 'filter-1',
          sourceHandle: 'transform-1-output',
          targetHandle: 'filter-1-input',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' },
          style: { stroke: '#ef4444', strokeWidth: 3 }
        }
      ]
    }
  ]
};