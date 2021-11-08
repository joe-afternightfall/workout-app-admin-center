import React from 'react';
import { blue, red } from '@material-ui/core/colors';
import { WorkoutCircuitProps } from '../../WorkoutScreen';
import { Typography, Button, Dialog, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NightfallDialogContent } from 'workout-app-common-core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    confirmButton: {
      color: red[500],
    },
    cancelButton: {
      color: blue[500],
    },
  })
);

export default function DeleteCircuitDialog(
  props: DeleteCircuitDialogProps
): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>{'Delete Circuit'}</Button>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <NightfallDialogContent
          title={'Delete Circuit'}
          closeClickHandler={handleClose}
          dialogContent={
            <Typography style={{ padding: '32px 0' }}>
              {`Are you sure you want to delete ${props.circuit.name} Circuit?`}
            </Typography>
          }
          dialogActions={
            <Grid container justify={'flex-end'}>
              <Grid item>
                <Button
                  onClick={() => {
                    props.deleteClickHandler(props.circuit.id);
                    handleClose();
                  }}
                  className={classes.confirmButton}
                >
                  {'Yes Delete'}
                </Button>
              </Grid>

              <Grid item>
                <Button className={classes.cancelButton} onClick={handleClose}>
                  {'Cancel'}
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Dialog>
    </>
  );
}

interface DeleteCircuitDialogProps {
  circuit: WorkoutCircuitProps;
  deleteClickHandler: (id: string) => void;
}
