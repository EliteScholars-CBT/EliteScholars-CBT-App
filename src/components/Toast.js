import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'achievement': return '🏆';
      default: return 'ℹ️';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'linear-gradient(135deg, #10B981, #059669)';
      case 'error': return 'linear-gradient(135deg, #EF4444, #DC2626)';
      case 'warning': return 'linear-gradient(135deg, #F59E0B, #D97706)';
      case 'achievement': return 'linear-gradient(135deg, #D4AF37, #B8860B)';
      default: return 'linear-gradient(135deg, #3B82F6, #2563EB)';
    }
  };

  return (
    <div className={`toast toast-${type}`} style={{ background: getBackgroundColor() }}>
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
