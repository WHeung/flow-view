import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import JSONEditor from '../components/JSONEditor';
import FlowCanvas from '../components/FlowCanvas';

export default {
  title: 'Example/Flow Editor',
  component: null,
};

const Template = () => {
  const [json, setJson] = useState('{}');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <Grid container spacing={2} style={{ height: '100vh', padding: 16 }}>
      <Grid item xs={6}>
        <Paper style={{ height: '100%', padding: 16 }}>
          <JSONEditor value={json} onChange={setJson} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ height: '100%' }}>
          <FlowCanvas nodes={nodes} edges={edges} onNodesChange={setNodes} onEdgesChange={setEdges} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export const Demo = Template.bind({});
