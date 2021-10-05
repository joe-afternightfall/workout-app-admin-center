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
import { ExerciseVO, Segment } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import {
  addSetToExercise,
  updateSegmentExercise,
} from '../../../../../../../creators/routine-builder/builder';
import SetField from '../SetField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const ExerciseCard = ({
  exercises,
  segment,
  addSetHandler,
  selectExerciseHandler,
}: ExerciseCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let selectedExercise: ExerciseVO | undefined = undefined;
  let selectedExerciseId = '';

  exercises.map((exercise) => {
    segment.exercises.find((workoutExercise) => {
      if (workoutExercise.exerciseId === exercise.id) {
        selectedExerciseId = exercise.id;
        // foundExercise = exercise;
        return (selectedExercise = exercise);
      }
    });
  });

  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          // value={defaultValue}
          id={`${segment.id}-exercise-menu`}
          options={exercises}
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
      {selectedExercise &&
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
                          <SetField
                            paramTypeId={
                              selectedExercise &&
                              selectedExercise.parameterTypeId
                                ? selectedExercise.parameterTypeId
                                : ''
                            }
                          />
                        }
                      />
                    );
                  })}
                  {workoutExercise.sets.length === 4 ? undefined : (
                    <Grid container alignItems={'center'}>
                      <Grid item>
                        <Typography>{`${
                          workoutExercise.sets.length + 1
                        }. `}</Typography>
                      </Grid>
                      <Grid item>
                        {/*<TextField placeholder={'click to add set'} />*/}
                        <Link
                          component={'button'}
                          variant={'body2'}
                          color={'textSecondary'}
                          onClick={() => {
                            addSetHandler(workoutExercise.id);
                          }}
                        >
                          {'click to add another set'}
                        </Link>
                      </Grid>
                    </Grid>
                  )}
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

interface ExerciseCardProps {
  exercises: ExerciseVO[];
  addSetHandler: (workoutExerciseId: string) => void;
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
      dispatch(updateSegmentExercise(ownProps.segment.id, exerciseId));
      // dispatch(addSetToExercise(ownProps.segment.id, exerciseId));
    },
    addSetHandler: (exerciseId: string) => {
      dispatch(addSetToExercise(exerciseId));
    },
  } as unknown as ExerciseCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
