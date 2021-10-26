import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  deleteSegmentFromPhase,
  resetSetTypeAndExerciseInfo,
} from '../../../../../../../../creators/routine-builder/builder';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const EditingDialog = (props: EditingDialogProps & PassedInProps) => {
  const { dialogType, isDisabled } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const isRemove = dialogType === 'remove';
  return (
    <div>
      <Button
        disabled={isDisabled}
        onClick={openDialog}
        className={isRemove ? classes.deleteButton : undefined}
        color={isRemove ? undefined : 'secondary'}
      >
        {isRemove ? 'Remove' : 'Reset'}
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <Grid container className={classes.content} alignItems={'center'}>
            <Grid item>
              <DialogContentText>
                {`This will ${dialogType} the set type and delete any exercise info along with it`}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.actionHandler();
              closeDialog();
            }}
            className={classes.deleteButton}
          >
            {dialogType === 'reset' ? 'Reset' : 'Remove'}
          </Button>
          <Button onClick={closeDialog} color={'primary'} autoFocus>
            {'Go Back'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  segmentId: string;
  dialogType: 'reset' | 'remove';
  isDisabled?: boolean;
  clearCircuitHandler?: () => void;
  isCircuitSet?: boolean;
}

interface EditingDialogProps {
  actionHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): EditingDialogProps =>
  ({
    actionHandler: () => {
      if (ownProps.dialogType === 'reset') {
        ownProps.isCircuitSet &&
          ownProps.clearCircuitHandler &&
          ownProps.clearCircuitHandler();
        dispatch(resetSetTypeAndExerciseInfo(ownProps.segmentId));
      } else if (ownProps.dialogType === 'remove') {
        dispatch(deleteSegmentFromPhase(ownProps.segmentId));
      }
    },
  } as unknown as EditingDialogProps);

export default connect(null, mapDispatchToProps)(EditingDialog);
