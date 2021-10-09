import React from 'react';
import { Grid } from '@material-ui/core';
import BuilderCard from './routine-info/RoutineInfoCard';
import SelectorDrawer from './selector-drawer/SelectorDrawer';

export default function RoutineBuilder(): JSX.Element {
  const [displayDrawer, setDisplayDrawer] = React.useState(false);

  const toggleSideDrawer = (display: boolean) => {
    setDisplayDrawer(display);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <BuilderCard toggleSideDrawerHandler={toggleSideDrawer} />
      </Grid>

      <Grid item xs={5}>
        <SelectorDrawer
          toggleHandler={toggleSideDrawer}
          display={displayDrawer}
        />
      </Grid>
    </Grid>
  );
}
