import React from 'react';

export const ConnectionLine = ({ 
  startPos, 
  endPos, 
  isTemporary = false, 
  onDelete 
}) => {
  if (!startPos || !endPos) return null;

  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  
  // Create smooth Bezier curve
  const controlOffset = Math.abs(dx) * 0.5;
  const path = `M ${startPos.x} ${startPos.y} C ${startPos.x + controlOffset} ${startPos.y}, ${endPos.x - controlOffset} ${endPos.y}, ${endPos.x} ${endPos.y}`;

  const midX = (startPos.x + endPos.x) / 2;
  const midY = (startPos.y + endPos.y) / 2;

  return (
    <g>
      <path
        d={path}
        stroke={isTemporary ? '#FF9800' : '#666'}
        strokeWidth="2"
        fill="none"
        strokeDasharray={isTemporary ? '5,5' : 'none'}
        markerEnd={!isTemporary ? 'url(#arrowhead)' : undefined}
        className="hover:stroke-[#B45309] transition-colors"
      />
      {!isTemporary && onDelete && (
        <circle
          cx={midX}
          cy={midY}
          r="8"
          fill="red"
          className="cursor-pointer hover:fill-red-600"
          style={{ pointerEvents: 'all' }}
          onClick={onDelete}
        />
      )}
      {!isTemporary && onDelete && (
        <text
          x={midX}
          y={midY + 3}
          textAnchor="middle"
          fill="white"
          fontSize="10"
          className="cursor-pointer"
          style={{ pointerEvents: 'all' }}
          onClick={onDelete}
        >
          ×
        </text>
      )}
    </g>
  );
};