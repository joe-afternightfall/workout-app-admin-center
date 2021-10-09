import React from 'react';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Card } from '@material-ui/core';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

export default function VerticalMenu(): JSX.Element {
  const [view, setView] = React.useState('list');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setView(nextView);
  };

  return (
    <Card>
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        <ToggleButton value="list" aria-label="list">
          <CalendarViewDayIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value="quilt" aria-label="quilt">
          <ViewQuiltIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}
