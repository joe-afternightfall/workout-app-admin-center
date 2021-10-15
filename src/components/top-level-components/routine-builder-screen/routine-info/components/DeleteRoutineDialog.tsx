import {
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deleteRoutineTemplate } from '../../../../../services/workout-configurations/routine-templates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      color: theme.palette.error.main,
    },
    content: {
      minHeight: '20vh',
      textAlign: 'center',
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
        <DialogTitle>{'Hold Up!'}</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container style={{ marginTop: '5vh' }}>
            <Grid item xs={12}>
              <Typography>
                {`Are you sure you want to delete the ${routineName} routine?`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{`you can't undo this action`}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.deleteHandler();
              closeDialog();
            }}
            className={classes.deleteButton}
          >
            {'Delete'}
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
