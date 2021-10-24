import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../../configs/redux/store';
import { Button, CardActions, Divider, Grid } from '@material-ui/core';
import {
  updateRoutineTemplate,
  saveNewRoutineTemplate,
  fetchAllRoutineTemplates,
} from '../../../../../services/workout-configurations/routine-templates';
import DeleteRoutineDialog from './DeleteRoutineDialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { clearRoutineBuilder } from '../../../../../creators/routine-builder/builder';
import { routerActions } from 'connected-react-router';
import { ROUTINE_TEMPLATES_SCREEN_PATH } from '../../../../../configs/constants/app';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cancelButton: {
      color: theme.palette.grey[500],
    },
  })
);

const RoutineInfoCardActions = (
  props: RoutineInfoCardActionsProps
): JSX.Element => {
  const classes = useStyles();
  const { saveDisabled, newRoutine, routineName } = props;

  return (
    <CardActions>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider variant={'middle'} />
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems={'center'}
          justify={'flex-end'}
          spacing={2}
        >
          <Grid item>
            <Button
              className={classes.cancelButton}
              onClick={props.cancelHandler}
            >
              {'Cancel'}
            </Button>
          </Grid>
          {!newRoutine && (
            <>
              <Grid item style={{ height: '100%' }}>
                <Divider orientation={'vertical'} variant={'fullWidth'} />
              </Grid>
              <Grid item>
                <DeleteRoutineDialog routineName={routineName} />
              </Grid>
            </>
          )}
          <Grid item style={{ height: '100%' }}>
            <Divider orientation={'vertical'} variant={'fullWidth'} />
          </Grid>
          <Grid item>
            <Button
              disabled={saveDisabled}
              color={'primary'}
              onClick={newRoutine ? props.saveHandler : props.updateHandler}
            >
              {newRoutine ? 'Save' : 'Update'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CardActions>
  );
};

interface RoutineInfoCardActionsProps {
  newRoutine: boolean;
  routineName: string;
  saveDisabled: boolean;
  saveHandler: () => void;
  updateHandler: () => void;
  cancelHandler: () => void;
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
              saveDisabled = !(
                workoutExercise.exerciseId !== '' &&
                workoutExercise.sets.length > 0
              );
            });
          } else {
            saveDisabled = true;
          }
        });
      } else {
        saveDisabled = true;
      }
    });
  }

  return {
    saveDisabled: saveDisabled,
    routineName: state.routineBuilderState.selectedRoutine.name,
    newRoutine: state.routineBuilderState.newRoutine,
  } as unknown as RoutineInfoCardActionsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineInfoCardActionsProps =>
  ({
    cancelHandler: () => {
      dispatch(routerActions.push(ROUTINE_TEMPLATES_SCREEN_PATH));
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        fetchAllRoutineTemplates()
      );
      setTimeout(() => {
        dispatch(clearRoutineBuilder());
      }, 100);
    },
    saveHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveNewRoutineTemplate()
      );
    },
    updateHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        updateRoutineTemplate()
      );
    },
  } as unknown as RoutineInfoCardActionsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineInfoCardActions);
