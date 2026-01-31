const nodeColors = {
  customInput: { 
    bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.2) 100%)', 
    border: 'rgba(59, 130, 246, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(59, 130, 246, 0.2)'
  },
  customOutput: { 
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)', 
    border: 'rgba(245, 158, 11, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(245, 158, 11, 0.2)'
  },
  text: { 
    bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(74, 222, 128, 0.2) 100%)', 
    border: 'rgba(34, 197, 94, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(34, 197, 94, 0.2)'
  },
  llm: { 
    bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(167, 139, 250, 0.2) 100%)', 
    border: 'rgba(139, 92, 246, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(139, 92, 246, 0.2)'
  },
  math: { 
    bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(248, 113, 113, 0.2) 100%)', 
    border: 'rgba(239, 68, 68, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(239, 68, 68, 0.2)'
  },
  filter: { 
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%)', 
    border: 'rgba(16, 185, 129, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(16, 185, 129, 0.2)'
  },
  transform: { 
    bg: 'linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(148, 163, 184, 0.2) 100%)', 
    border: 'rgba(100, 116, 139, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(100, 116, 139, 0.2)'
  },
  delay: { 
    bg: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(250, 204, 21, 0.2) 100%)', 
    border: 'rgba(234, 179, 8, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(234, 179, 8, 0.2)'
  },
  api: { 
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(129, 140, 248, 0.2) 100%)', 
    border: 'rgba(99, 102, 241, 0.3)', 
    text: '#ffffff',
    shadow: 'rgba(99, 102, 241, 0.2)'
  }
};

export const DraggableNode = ({ type, label, icon }) => {
    const colors = nodeColors[type] || { 
      bg: 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(156, 163, 175, 0.2) 100%)', 
      border: 'rgba(107, 114, 128, 0.3)', 
      text: '#ffffff',
      shadow: 'rgba(107, 114, 128, 0.2)'
    };
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          background: colors.bg,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${colors.border}`,
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 4px 12px ${colors.shadow}, 0 2px 4px rgba(0, 0, 0, 0.1)`,
          fontWeight: '500',
          fontSize: '13px',
          gap: '6px',
          position: 'relative',
          overflow: 'hidden'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.02)';
          e.target.style.boxShadow = `0 8px 25px ${colors.shadow}, 0 4px 8px rgba(0, 0, 0, 0.15)`;
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = `0 4px 12px ${colors.shadow}, 0 2px 4px rgba(0, 0, 0, 0.1)`;
        }}
      >
          {/* Subtle gradient overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            borderRadius: '12px',
            pointerEvents: 'none'
          }} />
          
          <div style={{
            color: colors.text,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9
          }}>
            {icon}
          </div>
          <span style={{ 
            color: colors.text, 
            zIndex: 1,
            fontWeight: '600',
            letterSpacing: '0.01em'
          }}>
            {label}
          </span>
      </div>
    );
  };
  