import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button } from '@material-ui/core';
import { ExerciseVO } from 'workout-app-common-core';
import { State } from '../../../configs/redux/store';
import BaseDeleteDialogContent from '../../shared/BaseDeleteDialogContent';
import { deleteExercise } from '../../../services/workout-configurations/exercises';

const DeleteExerciseDialog = (
  props: DeleteExerciseDialogProps & PassedInProps
) => {
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
