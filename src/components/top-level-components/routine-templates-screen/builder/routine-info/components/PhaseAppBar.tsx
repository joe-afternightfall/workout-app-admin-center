import React from 'react';
import { Grid } from '@material-ui/core';
import PhaseDropdown from './PhaseDropdown';
import ReorderDialog from './ReorderDialog';
import Toolbar from '@material-ui/core/Toolbar';
import { Phase } from 'workout-app-common-core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderTop: '6px solid #673AB7',
      borderRadius: 6,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function PhaseAppBar({ phase }: PhaseAppBarProps): JSX.Element {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <PhaseDropdown phase={phase} />
        </Grid>
        <Grid item xs={6} container justify={'flex-end'}>
          <ReorderDialog />
        </Grid>
      </Grid>
    </Toolbar>
  );
}

interface PhaseAppBarProps {
  phase: Phase;
}
