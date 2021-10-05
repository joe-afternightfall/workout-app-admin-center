import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Link,
  TextField,
} from '@material-ui/core';
import { ExerciseVO, Segment, WorkoutExercise } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import { addExerciseAndSetToSegment } from '../../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

function buildOptions(exercise: ExerciseVO) {
  const firstLetter = exercise.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...exercise,
  };
}

const ExerciseCard = ({
  exercises,
  segment,
  selectExerciseHandler,
}: ExerciseCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let defaultValue = null;
  const options = exercises.map((exercise) => {
    return buildOptions(exercise);
  });
  let selectedExerciseId = '';

  exercises.map((exercise) => {
    segment.exercises.find((workoutExercise) => {
      if (workoutExercise.exerciseId === exercise.id) {
        selectedExerciseId = exercise.id;
        return (defaultValue = buildOptions(exercise));
      }
    });
  });

  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          value={defaultValue}
          id={'set-exercise'}
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label={'Exercise'} variant={'outlined'} />
          )}
          onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
            newValue && selectExerciseHandler(newValue.id);
          }}
          getOptionSelected={(option, value) => option.id === value.id}
        />
      </Grid>
      {defaultValue &&
        segment.exercises.map((workoutExercise) => {
          if (workoutExercise.exerciseId === selectedExerciseId) {
            return (
              <Grid item xs={12}>
                <List>
                  {workoutExercise.sets.map((set, index) => {
                    return (
                      <ListItemText
                        key={index}
                        disableTypography
                        primary={
                          <Grid container alignItems={'center'}>
                            <Grid item>
                              <Typography>{'1.'}</Typography>
                            </Grid>
                            <Grid item>
                              {/*<TextField placeholder={'click to add set'} />*/}
                              <Link
                                component={'button'}
                                variant={'body2'}
                                color={'textSecondary'}
                                onClick={() => {
                                  console.info("I'm a button.");
                                }}
                              >
                                {'Add set'}
                              </Link>
                            </Grid>
                          </Grid>
                        }
                      />
                    );
                  })}
                </List>
              </Grid>
            );
          }
        })}
    </Grid>
  );
};

interface PassedInProps {
  segment: Segment;
}

export interface ExerciseCardProps {
  exercises: ExerciseVO[];
  selectExerciseHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseCardProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ExerciseCardProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseCardProps =>
  ({
    selectExerciseHandler: (exerciseId: string) => {
      dispatch(addExerciseAndSetToSegment(ownProps.segment.id, exerciseId));
      // dispatch(addSetToExercise(ownProps.segment.id, exerciseId));
    },
  } as unknown as ExerciseCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
