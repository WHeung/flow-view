import React from 'react';
import { TextField } from '@mui/material';

const JSONEditor = ({ value, onChange }) => (
  <TextField label="JSON Configuration" multiline rows={20} variant="outlined" fullWidth value={value} onChange={(e) => onChange(e.target.value)} />
);

export default JSONEditor;
