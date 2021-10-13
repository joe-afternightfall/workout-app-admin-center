import React, { useEffect } from 'react';
import { Grid, Slide, Fade } from '@material-ui/core';
import BuilderCard from './routine-info/RoutineInfoCard';
import SelectorDrawer from './selector-drawer/SelectorDrawer';

export default function RoutineBuilderScreen(): JSX.Element {
  const [display, setDisplay] = React.useState(false);

  useEffect(() => {
    setDisplay(true);
  });

  return (
    <Grid container spacing={2}>
      <Fade in={display}>
        <Grid item xs={7}>
          <BuilderCard />
        </Grid>
      </Fade>

      <Slide direction={'left'} in={display} mountOnEnter unmountOnExit>
        <Grid item xs={5}>
          <SelectorDrawer display={display} />
        </Grid>
      </Slide>
    </Grid>
  );
}
