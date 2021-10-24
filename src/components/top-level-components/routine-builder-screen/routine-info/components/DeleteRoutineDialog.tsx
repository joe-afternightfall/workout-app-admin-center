import { connect } from 'react-redux';
import React, { useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { Dialog, Button } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseDeleteDialogContent from '../../../../shared/BaseDeleteDialogContent';
import { deleteRoutineTemplate } from '../../../../../services/workout-configurations/routine-templates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      color: theme.palette.error.main,
    },
  })
);

const DeleteRoutineDialog = (
  props: DeleteRoutineDialogProps & PassedInProps
) => {
  const { routineName } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={openDialog} className={classes.deleteButton}>
        {'Delete'}
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <BaseDeleteDialogContent
          highlight={routineName}
          closeHandler={closeDialog}
          deleteHandler={() => {
            props.deleteHandler();
            closeDialog();
          }}
        />
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  routineName: string;
}

interface DeleteRoutineDialogProps {
  deleteHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DeleteRoutineDialogProps =>
  ({
    deleteHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deleteRoutineTemplate()
      );
    },
  } as unknown as DeleteRoutineDialogProps);

export default connect(null, mapDispatchToProps)(DeleteRoutineDialog);
