import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';
import { RoutineTemplateVO } from 'workout-app-common-core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      color: theme.palette.error.main,
    },
    content: {
      minHeight: '20vh',
    },
  })
);

const TimerDialog = (props: TimerDialogProps & PassedInProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  // WorkoutTimer {
  //     id: string;
  //     order: number;
  //     stepperTitle: string;
  //     timerMessage: string;
  //     seconds: number;
  // }
  return (
    <div>
      <IconButton edge={'end'} onClick={openDialog}>
        <TimerIcon />
      </IconButton>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialog();
            }}
            className={classes.deleteButton}
          >
            {'Save'}
          </Button>
          <Button onClick={closeDialog} color="primary" autoFocus>
            {'Go Back'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  segmentId: string;
  dialogType: 'reset' | 'delete';
  isDisabled?: boolean;
}

interface TimerDialogProps {
  actionHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): TimerDialogProps => ({} as unknown as TimerDialogProps);

export default connect(null, mapDispatchToProps)(TimerDialog);
