import React from 'react';
import { Segment } from 'workout-app-common-core';
import { Grid, Typography, Card } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
    },
    setsCard: {
      backgroundColor: '#673AB7',
      textAlign: 'center',
      color: '#fff',
      boxShadow: 'none',
    },
    setsContainer: {
      height: '100%',
    },
  })
);

export default function CompletedSets({
  segment,
  circuitSet,
}: CompletedSetsProps): JSX.Element {
  const classes = useStyles();

  const setLength = segment.exercises[0].sets.length;
  let title = '';
  if (circuitSet) {
    if (setLength === 1) {
      title = `${setLength} Lap`;
    } else {
      title = `${setLength} Laps`;
    }
  } else {
    if (setLength === 1) {
      title = `${setLength} Set`;
    } else {
      title = `${setLength} Sets`;
    }
  }

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'flex-end'}
      className={classes.root}
    >
      <Grid item xs={12}>
        {segment.exercises[0] && (
          <Card raised={false} className={classes.setsCard}>
            <Grid
              container
              justify={'center'}
              alignItems={'center'}
              className={classes.setsContainer}
            >
              <Grid item>
                <Typography variant={'h6'}>{title}</Typography>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

interface CompletedSetsProps {
  segment: Segment;
  circuitSet: boolean;
}
