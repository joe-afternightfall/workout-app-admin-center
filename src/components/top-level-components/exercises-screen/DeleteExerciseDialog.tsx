import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseDeleteDialogContent from '../../shared/BaseDeleteDialogContent';
import { State } from '../../../configs/redux/store';
import { deleteExercise } from '../../../services/workout-configurations/exercises';
import { ExerciseVO } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      minHeight: '20vh',
    },
  })
);

const DeleteExerciseDialog = (
  props: DeleteExerciseDialogProps & PassedInProps
) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={openDialog}>{'delete'}</Button>
      <Dialog open={open} onClose={closeDialog}>
        <BaseDeleteDialogContent
          highlight={props.exercise.name}
          closeHandler={closeDialog}
          deleteHandler={() => {
            props.deleteExerciseHandler(closeDialog);
          }}
        />
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  exercise: ExerciseVO;
}

interface DeleteExerciseDialogProps {
  deleteExerciseHandler: (successCallback: () => void) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeleteExerciseDialogProps =>
  ({
    deleteExerciseHandler: (successCallback: () => void) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deleteExercise(ownProps.exercise, successCallback)
      );
    },
  } as unknown as DeleteExerciseDialogProps);

export default connect(null, mapDispatchToProps)(DeleteExerciseDialog);
