import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deleteSetTypeAndExerciseInfo } from '../../../../../../../creators/routine-builder/builder';

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

const DeleteSetTypeDialog = ({
  deleteHandler,
}: DeleteSetTypeDialogProps & PassedInProps) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <CloseIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <Grid container className={classes.content} alignItems={'center'}>
            <Grid item>
              <DialogContentText>
                {
                  'This will reset the set type and delete any exercise info along with it'
                }
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteHandler();
              handleClose();
            }}
            className={classes.deleteButton}
          >
            {'Reset'}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {'Go Back'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface PassedInProps {
  segmentId: string;
}

interface DeleteSetTypeDialogProps {
  deleteHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeleteSetTypeDialogProps =>
  ({
    deleteHandler: () => {
      dispatch(deleteSetTypeAndExerciseInfo(ownProps.segmentId));
    },
  } as unknown as DeleteSetTypeDialogProps);

export default connect(null, mapDispatchToProps)(DeleteSetTypeDialog);
