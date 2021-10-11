import React from 'react';
import {
  Box,
  Dialog,
  Button,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { NightfallTooltip } from 'workout-app-common-core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deletePhaseFromRoutine } from '../../../../../../../../creators/routine-builder/builder';

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

const DeletePhaseDialog = ({
  phaseName,
  deletePhaseHandler,
}: DeletePhaseDialogProps & PassedInProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <NightfallTooltip
        title={'Delete Phase'}
        placement={'top'}
        component={
          <IconButton onClick={openDialog}>
            <Delete />
          </IconButton>
        }
      />
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{'Hold up!'}</DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.content}
          >
            <Grid item>
              <DialogContentText>
                <Typography>
                  {'Are you sure you want to delete the '}
                  <Box component={'span'} fontWeight={'bold'}>
                    {phaseName}
                  </Box>
                  {' phase?'}
                </Typography>
              </DialogContentText>
            </Grid>
            <Grid item>
              <DialogContentText>
                {`This and all the exercise info will be deleted along with it.`}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deletePhaseHandler();
              closeDialog();
            }}
            className={classes.deleteButton}
          >
            {'Yes Delete'}
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
  phaseId: string;
  phaseName: string;
}

interface DeletePhaseDialogProps {
  deletePhaseHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeletePhaseDialogProps =>
  ({
    deletePhaseHandler: () => {
      dispatch(deletePhaseFromRoutine(ownProps.phaseId));
    },
  } as unknown as DeletePhaseDialogProps);

export default connect(null, mapDispatchToProps)(DeletePhaseDialog);
