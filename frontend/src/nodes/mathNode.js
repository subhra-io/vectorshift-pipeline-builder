import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const fields = [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: 'add',
      options: [
        { value: 'add', label: 'Addition (+)' },
        { value: 'subtract', label: 'Subtraction (-)' },
        { value: 'multiply', label: 'Multiplication (×)' },
        { value: 'divide', label: 'Division (÷)' },
        { value: 'power', label: 'Power (^)' }
      ]
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-a`,
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-b`,
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-result`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      fields={fields}
      handles={handles}
    />
  );
};