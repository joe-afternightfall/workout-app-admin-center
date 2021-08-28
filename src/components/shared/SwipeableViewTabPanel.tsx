import React from 'react';
import Box from '@material-ui/core/Box';

export default function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role={'tab-panel'}
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}
