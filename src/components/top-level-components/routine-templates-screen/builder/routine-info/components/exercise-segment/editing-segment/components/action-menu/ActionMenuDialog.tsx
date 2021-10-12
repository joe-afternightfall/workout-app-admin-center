import React from 'react';
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
} from '../../../../../../../../../../creators/routine-builder/builder';
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

const ActionMenuDialog = ({
  open,
  dialogType,
  closeHandler,
  actionHandler,
}: DeleteSetTypeDialogProps & PassedInProps) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={closeHandler}>
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
            actionHandler();
            closeHandler();
          }}
          className={classes.deleteButton}
        >
          {dialogType === 'reset' ? 'Reset' : 'Delete'}
        </Button>
        <Button onClick={closeHandler} color="primary" autoFocus>
          {'Go Back'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface PassedInProps {
  open: boolean;
  segmentId: string;
  dialogType: string;
  closeHandler: () => void;
}

interface DeleteSetTypeDialogProps {
  actionHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeleteSetTypeDialogProps =>
  ({
    actionHandler: () => {
      if (ownProps.dialogType === 'reset') {
        dispatch(resetSetTypeAndExerciseInfo(ownProps.segmentId));
      } else if (ownProps.dialogType === 'delete') {
        dispatch(deleteSegmentFromPhase(ownProps.segmentId));
      }
    },
  } as unknown as DeleteSetTypeDialogProps);

export default connect(null, mapDispatchToProps)(ActionMenuDialog);
