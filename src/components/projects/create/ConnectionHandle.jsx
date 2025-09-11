import React from 'react';

export const ConnectionHandle = ({ 
  nodeId, 
  handleId, 
  type, 
  position, 
  onConnectionStart, 
  onConnectionEnd 
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      // Trigger connection drag with current mouse position
      window.dispatchEvent(new CustomEvent('connectionDrag', {
        detail: { x: e.clientX, y: e.clientY }
      }));
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);
      
      // Check if we're over another connection handle
      const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
      const targetHandle = elementUnder?.closest('.connection-handle');
      
      if (targetHandle && targetHandle !== e.target) {
        const targetData = JSON.parse(targetHandle.dataset.handleInfo || '{}');
        onConnectionEnd(targetData);
      } else {
        onConnectionEnd(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onConnectionEnd]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    onConnectionStart({
      nodeId,
      handleId,
      type,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
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
      data-handle-info={JSON.stringify({ nodeId, handleId, type })}
      onMouseDown={handleMouseDown}
    />
  );
};