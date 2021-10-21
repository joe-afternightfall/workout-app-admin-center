import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button, Grid } from '@material-ui/core';
import { State } from '../../../../configs/redux/store';
import ExerciseInfoContent from './ExerciseInfoContent';
import BaseDialogContent from '../../../shared/BaseDialogContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { saveExercise } from '../../../../services/workout-configurations/exercises';
import { closeExerciseFormDialog } from '../../../../creators/exercise-form/exercise-form';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      minHeight: '20vh',
    },
  })
);

const ExerciseFormDialog = (props: ExerciseFormDialogProps) => {
  const { open, isNewExercise, closeHandler } = props;
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={closeHandler}>
      <BaseDialogContent
        title={isNewExercise ? 'New Exercise' : 'Edit Exercise'}
        closeClickHandler={closeHandler}
        dialogContent={
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.content}
          >
            <Grid item>
              <ExerciseInfoContent />
            </Grid>
          </Grid>
        }
        dialogActions={
          <Grid item container justify={'flex-end'}>
            <Button
              color={'primary'}
              onClick={() => {
                props.saveExerciseClickHandler(closeHandler);
              }}
            >
              {isNewExercise ? 'Save' : 'Update'}
            </Button>
          </Grid>
        }
      />
    </Dialog>
  );
};

interface ExerciseFormDialogProps {
  open: boolean;
  isNewExercise: boolean;
  closeHandler: () => void;
  saveExerciseClickHandler: (successCallback: () => void) => void;
}

const mapStateToProps = (state: State): ExerciseFormDialogProps => {
  return {
    isNewExercise: state.exerciseFormState.newExerciseForm,
    open: state.exerciseFormState.openExerciseFormDialog,
  } as unknown as ExerciseFormDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseFormDialogProps =>
  ({
    saveExerciseClickHandler: (successCallback: () => void) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveExercise(successCallback)
      );
    },
    closeHandler: () => {
      dispatch(closeExerciseFormDialog());
    },
  } as unknown as ExerciseFormDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseFormDialog);
