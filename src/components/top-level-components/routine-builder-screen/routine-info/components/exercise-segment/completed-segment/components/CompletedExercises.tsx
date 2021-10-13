import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../../../configs/redux/store';
import { ExerciseVO, getExerciseName, Segment } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    iconWrapper: {
      height: '100%',
    },
  })
);

const CompletedExercises = ({
  icon,
  exercises,
  segment,
  setType,
}: CompletedExercisesProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {setType === 'super' && (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'textPrimary'}>
              {`1. ${
                segment.exercises[0] &&
                getExerciseName(exercises, segment.exercises[0].exerciseId)
              }`}
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
              {`2. ${
                segment.exercises[1] &&
                getExerciseName(exercises, segment.exercises[1].exerciseId)
              }`}
            </Typography>
          </Grid>
        </Grid>
      )}
      {setType === 'straight' && (
        <Grid>
          <Typography variant={'h6'} color={'textPrimary'}>
            {`1. ${
              segment.exercises[0] &&
              getExerciseName(exercises, segment.exercises[0].exerciseId)
            }`}
          </Typography>
        </Grid>
      )}
    </>
  );
};

interface PassedInProps {
  segment: Segment;
  icon: JSX.Element;
  setType: 'super' | 'straight' | null;
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
