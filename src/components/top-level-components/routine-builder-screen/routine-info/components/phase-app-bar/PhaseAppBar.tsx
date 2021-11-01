import React from 'react';
import { Grid } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import PhaseDropdown from './components/PhaseDropdown';
import ReorderDialog from './components/ReorderDialog';
import { getPhaseName, Phase } from 'workout-app-common-core';
import DeletePhaseDialog from './components/DeletePhaseDialog';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderTop: '6px solid #673AB7',
      borderRadius: 6,
    },
  })
);

export default function PhaseAppBar({ phase }: PhaseAppBarProps): JSX.Element {
  const classes = useStyles();

  const phaseName = getPhaseName(phase.phaseId, true);
  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <PhaseDropdown phase={phase} />
        </Grid>
        <Grid item xs={6} container justify={'flex-end'}>
          <Grid item>
            <DeletePhaseDialog
              phaseId={phase.id}
              phaseName={phaseName ? phaseName : ''}
            />
          </Grid>
          <Grid item>
            <ReorderDialog />
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

interface PhaseAppBarProps {
  phase: Phase;
}
