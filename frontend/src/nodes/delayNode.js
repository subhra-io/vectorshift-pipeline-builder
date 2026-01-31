import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const fields = [
    {
      name: 'duration',
      label: 'Delay Duration',
      type: 'number',
      defaultValue: 1000,
      placeholder: 'Milliseconds',
      min: 0,
      step: 100
    },
    {
      name: 'unit',
      label: 'Time Unit',
      type: 'select',
      defaultValue: 'ms',
      options: [
        { value: 'ms', label: 'Milliseconds' },
        { value: 's', label: 'Seconds' },
        { value: 'm', label: 'Minutes' }
      ]
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
      title="Delay"
      fields={fields}
      handles={handles}
    />
  );
};