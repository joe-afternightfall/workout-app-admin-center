import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createNewCircuitType } from '../../../../services/workout-configurations/circuit-types-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formControl: {
      width: '100%',
    },
  })
);

export default function NewCircuitDialog(
  props: NewCircuitDialogProps
): JSX.Element {
  const classes = useStyles();
  const [textField, setTextField] = React.useState<string>('');

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextField(event.target.value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>{'New Circuit'}</Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ margin: '32px 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              placeholder={'Enter Circuit Name'}
              onChange={handleTextFieldChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
        <Button
          disabled={textField === ''}
          onClick={() => {
            createNewCircuitType(textField).then(() => {
              props.closeClickHandler();
            });
          }}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface NewCircuitDialogProps {
  open: boolean;
  closeClickHandler: () => void;
}
