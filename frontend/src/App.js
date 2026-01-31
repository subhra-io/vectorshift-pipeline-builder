import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ExamplesPanel } from './components/ExamplesPanel';
import { Zap, Layers, GitBranch } from 'lucide-react';

function App() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <header style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        color: 'white',
        padding: '20px 32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '8px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <Zap size={24} color="#3b82f6" />
          </div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              VectorShift Pipeline Builder
            </h1>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400'
            }}>
              Create powerful data processing workflows with drag-and-drop simplicity
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} />
            <span>Visual Node Editor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GitBranch size={16} />
            <span>DAG Validation</span>
          </div>
        </div>
      </header>
      
      <PipelineToolbar />
      
      <div style={{ 
        flex: 1, 
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        margin: '0 16px',
        borderRadius: '16px 16px 0 0',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: 'none'
      }}>
        <PipelineUI />
      </div>
      
      <SubmitButton />
      
      {/* Examples Panel */}
      <ExamplesPanel />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
