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
      minHeight: '6vh',
    },
  })
);

export default function CompletedSets({
  segment,
}: CompletedSetsProps): JSX.Element {
  const classes = useStyles();

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
                <Typography variant={'h6'}>
                  {`${segment.exercises[0].sets.length} Sets`}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export interface CompletedSetsProps {
  segment: Segment;
}
