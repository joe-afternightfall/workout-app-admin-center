import React from 'react';
import { connect } from 'react-redux';
import { Link as LinkIcon } from '@material-ui/icons';
import { Grid, Typography, Divider } from '@material-ui/core';
import { ExerciseVO, Segment, getExerciseName } from 'workout-app-common-core';
import { State } from '../../../../../../../../configs/redux/store';
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

const CompletedExercises = ({
  linkIconSize,
  segment,
  setType,
  hideNumbers,
  exercises,
}: CompletedExercisesProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  let firstElementTitle;
  let secondElementTitle;

  if (setType === 'superset') {
    firstElementTitle =
      segment.exercises[0] &&
      getExerciseName(exercises, segment.exercises[0].exerciseId);
    secondElementTitle =
      segment.exercises[1] &&
      getExerciseName(exercises, segment.exercises[1].exerciseId);
  } else if (setType === 'straight-set') {
    firstElementTitle =
      segment.exercises[0] &&
      getExerciseName(exercises, segment.exercises[0].exerciseId);
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
              exercises,
              workoutExercise.exerciseId
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
};

interface PassedInProps {
  hideNumbers?: boolean;
  segment: Segment;
  linkIconSize: 'inherit' | 'default' | 'small' | 'large';
  setType: 'superset' | 'straight-set' | 'circuit-set' | null;
}

interface CompletedExercisesProps {
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): CompletedExercisesProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as CompletedExercisesProps;
};

export default connect(mapStateToProps)(CompletedExercises);
