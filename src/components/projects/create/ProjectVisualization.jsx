import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { NetworkIcon, PlusIcon, SaveIcon, DownloadIcon } from 'lucide-react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-[#B45309] rounded-lg p-3 shadow-sm min-w-[100px]">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />
      <div className="flex items-center">
        <NetworkIcon className="h-4 w-4 text-[#B45309] mr-2" />
        <span className="text-xs font-medium">{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-green-500 border-2 border-white"
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const ProjectVisualization = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    const templateNodes = template.nodes.map((nodeName, index) => ({
      id: `${index + 1}`,
      type: 'custom',
      position: { 
        x: 100 + (index % 3) * 200, 
        y: 100 + Math.floor(index / 3) * 150 
      },
      data: { label: nodeName },
    }));
    setNodes(templateNodes);
    setEdges([]);
  };

  const addCustomNode = () => {
    const newNode = {
      id: `${Date.now()}`,
      type: 'custom',
      position: { 
        x: 100 + (nodes.length % 4) * 150, 
        y: 100 + Math.floor(nodes.length / 4) * 120 
      },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
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
          <div className="h-[500px] border-2 border-dashed border-gray-300 rounded-lg">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              className="bg-gray-50 dark:bg-gray-700"
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      {/* Node Properties Panel */}
      {nodes.length > 0 && (
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
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data.label}
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
                <li>• Drag nodes to reposition them</li>
                <li>• Drag from node edges to create connections</li>
                <li>• Use controls to zoom and fit view</li>
                <li>• Export diagrams to share with your mentees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};