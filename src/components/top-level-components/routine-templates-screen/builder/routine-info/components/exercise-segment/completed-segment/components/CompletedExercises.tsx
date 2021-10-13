import React from 'react';
import { Segment } from 'workout-app-common-core';
import { Grid, Typography, Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    iconWrapper: {
      height: '100%',
    },
  })
);

export default function CompletedExercises({
  icon,
  segment,
  setType,
}: CompletedExercisesProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      {setType === 'super' && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'textPrimary'}>
              {`1. ${segment.exercises[0] && segment.exercises[0].exerciseId}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              className={classes.iconWrapper}
            >
              <Grid item xs={8}>
                <Divider variant={'fullWidth'} />
              </Grid>
              <Grid item xs={2}>
                {icon}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'textPrimary'}>
              {`2. ${segment.exercises[1] && segment.exercises[1].exerciseId}`}
            </Typography>
          </Grid>
        </Grid>
      )}
      {setType === 'straight' && (
        <Grid>
          <Typography variant={'h6'} color={'textPrimary'}>
            {`1. ${segment.exercises[0] && segment.exercises[0].exerciseId}`}
          </Typography>
        </Grid>
      )}
    </>
  );
}

export interface CompletedExercisesProps {
  segment: Segment;
  icon: JSX.Element;
  setType: 'super' | 'straight' | null;
}
