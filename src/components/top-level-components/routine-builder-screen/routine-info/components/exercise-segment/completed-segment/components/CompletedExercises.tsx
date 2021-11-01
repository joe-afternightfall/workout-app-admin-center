import React from 'react';
import { Link as LinkIcon } from '@material-ui/icons';
import { Grid, Typography, Divider } from '@material-ui/core';
import { getExerciseName, Segment } from 'workout-app-common-core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconWrapper: {
      height: '100%',
    },
    icon: {
      color: theme.palette.text.secondary,
    },
  })
);

function buildLineItem(title: string, index: number): JSX.Element {
  return (
    <Grid item xs={12} key={index}>
      <Typography variant={'h6'} color={'textPrimary'}>
        {title}
      </Typography>
    </Grid>
  );
}

export default function CompletedExercises({
  linkIconSize,
  segment,
  setType,
  hideNumbers,
}: CompletedExercisesProps): JSX.Element {
  const classes = useStyles();

  let firstElementTitle;
  let secondElementTitle;

  if (setType === 'superset') {
    firstElementTitle =
      segment.exercises[0] &&
      getExerciseName(segment.exercises[0].exerciseId, true);
    secondElementTitle =
      segment.exercises[1] &&
      getExerciseName(segment.exercises[1].exerciseId, true);
  } else if (setType === 'straight-set') {
    firstElementTitle =
      segment.exercises[0] &&
      getExerciseName(segment.exercises[0].exerciseId, true);
  }

  return (
    <>
      {setType === 'superset' && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'textPrimary'}>
              {hideNumbers ? firstElementTitle : `1. ${firstElementTitle}`}
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
                <LinkIcon className={classes.icon} fontSize={linkIconSize} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'textPrimary'}>
              {hideNumbers ? secondElementTitle : `2. ${secondElementTitle}`}
            </Typography>
          </Grid>
        </Grid>
      )}
      {setType === 'straight-set' && (
        <Grid>
          <Typography variant={'h6'} color={'textPrimary'}>
            {hideNumbers ? firstElementTitle : `1. ${firstElementTitle}`}
          </Typography>
        </Grid>
      )}
      {setType === 'circuit-set' && (
        <Grid container spacing={2}>
          {segment.exercises.map((workoutExercise, index) => {
            const exerciseName = getExerciseName(
              workoutExercise.exerciseId,
              true
            );
            const title = hideNumbers
              ? exerciseName
              : `${index + 1}. ${exerciseName}`;
            return title && buildLineItem(title, index);
          })}
        </Grid>
      )}
    </>
  );
}

interface CompletedExercisesProps {
  hideNumbers?: boolean;
  segment: Segment;
  linkIconSize: 'inherit' | 'default' | 'small' | 'large';
  setType: 'superset' | 'straight-set' | 'circuit-set' | null;
}
