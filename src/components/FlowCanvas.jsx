import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';

const FlowCanvas = ({ nodes = [], edges = [], onNodesChange, onEdgesChange }) => (
  <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
    <Background />
    <Controls />
  </ReactFlow>
);

export default FlowCanvas;
