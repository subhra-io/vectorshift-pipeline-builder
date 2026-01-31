import { useState } from 'react';
import { Handle } from 'reactflow';

const nodeThemes = {
  customInput: {
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 197, 253, 0.8) 100%)',
    border: 'rgba(59, 130, 246, 0.4)',
    shadow: 'rgba(59, 130, 246, 0.3)'
  },
  customOutput: {
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(251, 191, 36, 0.8) 100%)',
    border: 'rgba(245, 158, 11, 0.4)',
    shadow: 'rgba(245, 158, 11, 0.3)'
  },
  text: {
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(74, 222, 128, 0.8) 100%)',
    border: 'rgba(34, 197, 94, 0.4)',
    shadow: 'rgba(34, 197, 94, 0.3)'
  },
  llm: {
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(167, 139, 250, 0.8) 100%)',
    border: 'rgba(139, 92, 246, 0.4)',
    shadow: 'rgba(139, 92, 246, 0.3)'
  },
  math: {
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(248, 113, 113, 0.8) 100%)',
    border: 'rgba(239, 68, 68, 0.4)',
    shadow: 'rgba(239, 68, 68, 0.3)'
  },
  filter: {
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(52, 211, 153, 0.8) 100%)',
    border: 'rgba(16, 185, 129, 0.4)',
    shadow: 'rgba(16, 185, 129, 0.3)'
  },
  transform: {
    gradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.9) 0%, rgba(148, 163, 184, 0.8) 100%)',
    border: 'rgba(100, 116, 139, 0.4)',
    shadow: 'rgba(100, 116, 139, 0.3)'
  },
  delay: {
    gradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.9) 0%, rgba(250, 204, 21, 0.8) 100%)',
    border: 'rgba(234, 179, 8, 0.4)',
    shadow: 'rgba(234, 179, 8, 0.3)'
  },
  api: {
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(129, 140, 248, 0.8) 100%)',
    border: 'rgba(99, 102, 241, 0.4)',
    shadow: 'rgba(99, 102, 241, 0.3)'
  }
};

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  fields = [], 
  handles = [], 
  style = {},
  className = '',
  children 
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Determine node type from id or data
  const nodeType = data?.nodeType || id?.split('-')[0] || 'default';
  const theme = nodeThemes[nodeType] || nodeThemes.customInput;

  const defaultStyle = {
    width: 220,
    height: 'auto',
    minHeight: 100,
    background: theme.gradient,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '16px',
    boxShadow: `0 8px 32px ${theme.shadow}, 0 4px 8px rgba(0, 0, 0, 0.1)`,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];
    
    const inputStyle = {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      marginTop: '6px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      color: '#374151',
      fontFamily: 'inherit',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    };
    
    switch (field.type) {
      case 'text':
        return (
          <input
            key={field.name}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }}
          />
        );
      case 'textarea':
        return (
          <textarea
            key={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '60px'
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
        );
      case 'select':
        return (
          <select
            key={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={inputStyle}
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            key={field.name}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={defaultStyle} className={className}>
      {/* Glass overlay effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        borderRadius: '16px',
        pointerEvents: 'none'
      }} />
      
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.position}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{
            background: '#ffffff',
            border: '3px solid rgba(255, 255, 255, 0.8)',
            width: '14px',
            height: '14px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            ...handle.style
          }}
        />
      ))}
      
      {/* Node header */}
      <div style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '12px',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        letterSpacing: '-0.01em',
        zIndex: 1,
        position: 'relative'
      }}>
        {title}
      </div>
      
      {/* Render fields */}
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: '12px', zIndex: 1, position: 'relative' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '4px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            {field.label}:
          </label>
          {renderField(field)}
        </div>
      ))}
      
      {/* Custom children content */}
      <div style={{ zIndex: 1, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};