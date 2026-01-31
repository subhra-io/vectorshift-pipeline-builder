import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const fields = [
    {
      name: 'transformation',
      label: 'Transform Type',
      type: 'select',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'To Uppercase' },
        { value: 'lowercase', label: 'To Lowercase' },
        { value: 'trim', label: 'Trim Whitespace' },
        { value: 'reverse', label: 'Reverse Text' },
        { value: 'length', label: 'Get Length' }
      ]
    },
    {
      name: 'customScript',
      label: 'Custom Script',
      type: 'textarea',
      defaultValue: '',
      placeholder: 'Optional: JavaScript transformation code',
      rows: 2
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
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
      title="Transform"
      fields={fields}
      handles={handles}
    />
  );
};