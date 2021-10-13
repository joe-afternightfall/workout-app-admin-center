import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../../configs/redux/store';
import { Button, CardActions, Divider, Grid } from '@material-ui/core';
import { saveNewRoutineTemplate } from '../../../../../services/workout-configurations/routine-templates';

const RoutineInfoCardActions = ({
  saveHandler,
  saveDisabled,
}: RoutineInfoCardActionsProps): JSX.Element => {
  return (
    <CardActions>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider variant={'middle'} />
        </Grid>
        <Grid item container alignItems={'center'} justify={'flex-end'}>
          <Button
            disabled={saveDisabled}
            color={'primary'}
            onClick={saveHandler}
          >
            {'Save Routine'}
          </Button>
        </Grid>
      </Grid>
    </CardActions>
  );
};

interface RoutineInfoCardActionsProps {
  saveDisabled: boolean;
  saveHandler: () => void;
}

const mapStateToProps = (state: State): RoutineInfoCardActionsProps => {
  let saveDisabled = true;
  const selectedRoutine = state.routineBuilderState.selectedRoutine;
  if (
    selectedRoutine.workoutCategoryId !== '' &&
    selectedRoutine.name !== '' &&
    selectedRoutine.phases.length > 0
  ) {
    selectedRoutine.phases.map((phase) => {
      if (phase.phaseId !== '' && phase.segments.length > 0) {
        phase.segments.map((segment) => {
          if (
            segment.trainingSetTypeId !== '' &&
            segment.exercises.length > 0
          ) {
            segment.exercises.map((workoutExercise) => {
              if (
                workoutExercise.exerciseId !== '' &&
                workoutExercise.sets.length > 0
              ) {
                saveDisabled = false;
              }
            });
          }
        });
      }
    });
  }

  return {
    saveDisabled: saveDisabled,
  } as unknown as RoutineInfoCardActionsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineInfoCardActionsProps =>
  ({
    saveHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveNewRoutineTemplate()
      );
    },
  } as unknown as RoutineInfoCardActionsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineInfoCardActions);
