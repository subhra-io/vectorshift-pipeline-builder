import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const fields = [
    {
      name: 'method',
      label: 'HTTP Method',
      type: 'select',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'PATCH', label: 'PATCH' }
      ]
    },
    {
      name: 'url',
      label: 'API Endpoint',
      type: 'text',
      defaultValue: '',
      placeholder: 'https://api.example.com/endpoint'
    },
    {
      name: 'headers',
      label: 'Headers (JSON)',
      type: 'textarea',
      defaultValue: '{}',
      placeholder: '{"Authorization": "Bearer token"}',
      rows: 2
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-body`,
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-params`,
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`,
      style: { top: '30%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-error`,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      fields={fields}
      handles={handles}
    />
  );
};