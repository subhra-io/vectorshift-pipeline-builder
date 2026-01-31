import { DraggableNode } from './draggableNode';
import { 
  Download, 
  Zap, 
  Upload, 
  Type, 
  Calculator, 
  Filter, 
  RotateCcw, 
  Clock, 
  Globe,
  Sparkles
} from 'lucide-react';

const nodeCategories = [
  {
    title: 'Core Nodes',
    description: 'Essential building blocks for your pipeline',
    icon: <Sparkles size={18} />,
    nodes: [
      { type: 'customInput', label: 'Input', icon: <Download size={16} /> },
      { type: 'customOutput', label: 'Output', icon: <Upload size={16} /> },
      { type: 'text', label: 'Text', icon: <Type size={16} /> },
      { type: 'llm', label: 'LLM', icon: <Zap size={16} /> }
    ]
  },
  {
    title: 'Processing Nodes',
    description: 'Transform and manipulate your data',
    icon: <RotateCcw size={18} />,
    nodes: [
      { type: 'math', label: 'Math', icon: <Calculator size={16} /> },
      { type: 'filter', label: 'Filter', icon: <Filter size={16} /> },
      { type: 'transform', label: 'Transform', icon: <RotateCcw size={16} /> },
      { type: 'delay', label: 'Delay', icon: <Clock size={16} /> },
      { type: 'api', label: 'API Call', icon: <Globe size={16} /> }
    ]
  }
];

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '24px 32px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            position: 'relative',
            zIndex: 5
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    borderRadius: '10px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <Sparkles size={20} color="white" />
                </div>
                <div>
                    <h2 style={{
                        margin: 0,
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'white',
                        letterSpacing: '-0.01em'
                    }}>
                        Node Palette
                    </h2>
                    <p style={{
                        margin: '2px 0 0 0',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        Drag nodes to the canvas to build your pipeline
                    </p>
                </div>
            </div>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {nodeCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                color: 'rgba(255, 255, 255, 0.9)'
                            }}>
                                {category.icon}
                            </div>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: 'white'
                                }}>
                                    {category.title}
                                </h3>
                                <p style={{
                                    margin: '2px 0 0 0',
                                    fontSize: '12px',
                                    color: 'rgba(255, 255, 255, 0.6)'
                                }}>
                                    {category.description}
                                </p>
                            </div>
                        </div>
                        
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '12px' 
                        }}>
                            {category.nodes.map((node, nodeIndex) => (
                                <DraggableNode 
                                    key={nodeIndex}
                                    type={node.type} 
                                    label={node.label}
                                    icon={node.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
