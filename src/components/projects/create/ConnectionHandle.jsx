import React from 'react';

export const ConnectionHandle = ({ 
  nodeId, 
  handleId, 
  type, 
  position, 
  onConnectionStart, 
  onConnectionEnd 
}) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const startPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    onConnectionStart({
      nodeId,
      handleId,
      type,
      position: startPos
    });
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const endPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    onConnectionEnd({
      nodeId,
      handleId,
      type,
      position: endPos
    });
  };

  const positionStyles = {
    right: { right: -6, top: '50%', transform: 'translateY(-50%)' },
    left: { left: -6, top: '50%', transform: 'translateY(-50%)' },
    top: { top: -6, left: '50%', transform: 'translateX(-50%)' },
    bottom: { bottom: -6, left: '50%', transform: 'translateX(-50%)' }
  };

  const typeColors = {
    output: 'bg-green-500 hover:bg-green-600',
    input: 'bg-blue-500 hover:bg-blue-600'
  };

  return (
    <div
      className={`connection-handle absolute w-3 h-3 rounded-full border-2 border-white cursor-crosshair transition-all hover:scale-110 z-20 ${typeColors[type]}`}
      style={positionStyles[position]}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};