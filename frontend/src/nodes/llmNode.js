import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: '33%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: '67%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
    >
      <div style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        fontStyle: 'italic',
        marginTop: '8px',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
      }}>
        Large Language Model
      </div>
    </BaseNode>
  );
};
