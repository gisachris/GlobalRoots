import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { NetworkIcon, PlusIcon, SaveIcon, DownloadIcon } from 'lucide-react';
import { ConnectionHandle } from './ConnectionHandle';
import { ConnectionLine } from './ConnectionLine';

export const ProjectVisualization = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customNodes, setCustomNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [temporaryConnection, setTemporaryConnection] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDraggingConnection, setIsDraggingConnection] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const svgRef = useRef(null);
  const canvasRef = useRef(null);

  const templates = [
    {
      id: 'web-app',
      name: 'Web Application',
      description: 'Standard web application architecture',
      nodes: ['Frontend', 'Backend API', 'Database', 'Authentication']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'Mobile app with backend services',
      nodes: ['Mobile App', 'API Gateway', 'Microservices', 'Database', 'Push Notifications']
    },
    {
      id: 'iot-system',
      name: 'IoT System',
      description: 'Internet of Things architecture',
      nodes: ['IoT Devices', 'Gateway', 'Cloud Platform', 'Analytics', 'Dashboard']
    },
    {
      id: 'ai-ml',
      name: 'AI/ML Pipeline',
      description: 'Machine learning workflow',
      nodes: ['Data Collection', 'Data Processing', 'Model Training', 'Model Deployment', 'API']
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    setCustomNodes(template.nodes.map((node, index) => ({
      id: index + 1,
      name: node,
      x: 100 + (index % 3) * 200,
      y: 100 + Math.floor(index / 3) * 150
    })));
    setConnections([]);
  };

  const addCustomNode = () => {
    const newNode = {
      id: Date.now(),
      name: `Node ${customNodes.length + 1}`,
      x: 100 + (customNodes.length % 4) * 150,
      y: 100 + Math.floor(customNodes.length / 4) * 120
    };
    setCustomNodes([...customNodes, newNode]);
  };

  const handleConnectionStart = useCallback((data) => {
    setIsDraggingConnection(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const startPos = {
      x: data.position.x - rect.left,
      y: data.position.y - rect.top
    };
    setTemporaryConnection({
      sourceNode: data.nodeId,
      sourceHandle: data.handleId,
      type: data.type,
      startPos,
      endPos: startPos
    });
  }, []);

  const handleConnectionDrag = useCallback((e) => {
    if (isDraggingConnection && temporaryConnection) {
      const rect = canvasRef.current.getBoundingClientRect();
      setTemporaryConnection(prev => ({
        ...prev,
        endPos: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }));
    }
  }, [isDraggingConnection, temporaryConnection]);

  const handleConnectionEnd = useCallback((data) => {
    if (isDraggingConnection && temporaryConnection && data) {
      const isValidConnection = 
        data.nodeId !== temporaryConnection.sourceNode &&
        data.type !== temporaryConnection.type &&
        !connections.some(c => 
          c.sourceNode === temporaryConnection.sourceNode && 
          c.targetNode === data.nodeId
        );

      if (isValidConnection) {
        const rect = canvasRef.current.getBoundingClientRect();
        const newConnection = {
          id: Date.now(),
          sourceNode: temporaryConnection.sourceNode,
          sourceHandle: temporaryConnection.sourceHandle,
          targetNode: data.nodeId,
          targetHandle: data.handleId,
          startPos: temporaryConnection.startPos,
          endPos: {
            x: data.position.x - rect.left,
            y: data.position.y - rect.top
          }
        };
        setConnections(prev => [...prev, newConnection]);
      }
    }
    setTemporaryConnection(null);
    setIsDraggingConnection(false);
  }, [isDraggingConnection, temporaryConnection, connections]);

  // Node dragging
  const handleNodeMouseDown = useCallback((e, nodeId) => {
    if (e.target.closest('.connection-handle')) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const node = customNodes.find(n => n.id === nodeId);
    setDraggedNode({
      id: nodeId,
      offsetX: e.clientX - rect.left - node.x,
      offsetY: e.clientY - rect.top - node.y
    });
  }, [customNodes]);

  const handleMouseMove = useCallback((e) => {
    if (isDraggingConnection) {
      handleConnectionDrag(e);
    } else if (draggedNode) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - draggedNode.offsetX;
      const newY = e.clientY - rect.top - draggedNode.offsetY;
      
      setCustomNodes(prev => prev.map(node => 
        node.id === draggedNode.id 
          ? { ...node, x: Math.max(0, newX), y: Math.max(0, newY) }
          : node
      ));
    }
  }, [isDraggingConnection, draggedNode, handleConnectionDrag]);

  const handleMouseUp = useCallback(() => {
    if (isDraggingConnection) {
      handleConnectionEnd(null);
    }
    setDraggedNode(null);
  }, [isDraggingConnection, handleConnectionEnd]);

  // Global mouse events
  React.useEffect(() => {
    if (isDraggingConnection || draggedNode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingConnection, draggedNode, handleMouseMove, handleMouseUp]);

  const deleteConnection = (connectionId) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">
          Project Visualization Schema
        </h2>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Create visual diagrams to help mentees understand project architecture
        </p>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose a Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-[#B45309] bg-[#B45309]/5'
                    : 'border-gray-200 hover:border-[#B45309]/50'
                }`}
              >
                <h3 className="font-semibold text-[#503314] dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.nodes.map((node, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visualization Canvas */}
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Project Architecture</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={addCustomNode}>
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Node
                </Button>
                <Button variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-6 min-h-[400px] border-2 border-dashed border-gray-300">
              {/* Canvas Area */}
              <div 
                ref={canvasRef}
                className="relative w-full h-full"
              >
                {customNodes.map((node) => (
                  <div 
                    key={node.id}
                    className={`absolute bg-white dark:bg-gray-800 border-2 rounded-lg p-3 shadow-sm cursor-move select-none ${
                      selectedNode === node.id ? 'border-blue-500' : 'border-[#B45309]'
                    }`}
                    style={{ left: node.x, top: node.y, width: '100px', height: '40px' }}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    onClick={() => setSelectedNode(node.id)}
                  >
                    <div className="flex items-center h-full">
                      <NetworkIcon className="h-4 w-4 text-[#B45309] mr-2 flex-shrink-0" />
                      <span className="text-xs font-medium truncate">{node.name}</span>
                    </div>
                    
                    {/* Connection Handles */}
                    <ConnectionHandle
                      nodeId={node.id}
                      handleId="input"
                      type="input"
                      position="left"
                      onConnectionStart={handleConnectionStart}
                      onConnectionEnd={handleConnectionEnd}
                    />
                    <ConnectionHandle
                      nodeId={node.id}
                      handleId="output"
                      type="output"
                      position="right"
                      onConnectionStart={handleConnectionStart}
                      onConnectionEnd={handleConnectionEnd}
                    />
                  </div>
                ))}

                {/* Connection Lines */}
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ pointerEvents: 'none' }}>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#666"
                      />
                    </marker>
                  </defs>
                  
                  {/* Permanent connections */}
                  {connections.map((connection) => {
                    const sourceNode = customNodes.find(n => n.id === connection.sourceNode);
                    const targetNode = customNodes.find(n => n.id === connection.targetNode);
                    if (!sourceNode || !targetNode) return null;
                    
                    const startPos = {
                      x: sourceNode.x + (connection.sourceHandle === 'output' ? 100 : 0),
                      y: sourceNode.y + 20
                    };
                    const endPos = {
                      x: targetNode.x + (connection.targetHandle === 'input' ? 0 : 100),
                      y: targetNode.y + 20
                    };
                    
                    return (
                      <ConnectionLine
                        key={connection.id}
                        startPos={startPos}
                        endPos={endPos}
                        onDelete={() => deleteConnection(connection.id)}
                      />
                    );
                  })}
                  
                  {/* Temporary connection */}
                  {temporaryConnection && (
                    <ConnectionLine
                      startPos={temporaryConnection.startPos}
                      endPos={temporaryConnection.endPos}
                      isTemporary
                    />
                  )}
                </svg>

                {customNodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <NetworkIcon className="h-12 w-12 mx-auto mb-2" />
                      <p>Select a template to start building your architecture</p>
                    </div>
                  </div>
                )}
                
                {/* Instructions */}
                {customNodes.length > 0 && (
                  <div className="absolute top-2 left-2 bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs text-blue-800 dark:text-blue-200">
                    Drag from green (output) to blue (input) handles to connect nodes
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Node Properties Panel */}
      {customNodes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Node Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Selected Node</label>
                <select className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent">
                  <option value="">Select a node to edit</option>
                  {customNodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Node Name</label>
                  <input
                    type="text"
                    placeholder="Enter node name"
                    className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Node Type</label>
                  <select className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent">
                    <option value="service">Service</option>
                    <option value="database">Database</option>
                    <option value="api">API</option>
                    <option value="frontend">Frontend</option>
                    <option value="external">External Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe this component's role in the project"
                  className="w-full px-3 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="primary" className="flex items-center">
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Schema
        </Button>
        <Button variant="outline">
          Share with Mentees
        </Button>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <NetworkIcon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Visualization Tips
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Use templates as starting points for common architectures</li>
                <li>• Add custom nodes to represent specific project components</li>
                <li>• Connect related components to show data flow</li>
                <li>• Export diagrams to share with your mentees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};