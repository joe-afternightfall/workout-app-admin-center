import {
  Box,
  Grid,
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { NightfallDialogTitle } from 'workout-app-common-core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deActivateButton: {
      color: theme.palette.error.main,
    },
    content: {
      minHeight: '20vh',
    },
  })
);

export default function DeActivateDialog({
  highlight,
  deActivateClickHandler,
}: BaseDeleteDialogContentProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={openDialog}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={closeDialog}>
        <NightfallDialogTitle
          title={'Hold Up!'}
          closeClickHandler={closeDialog}
        />
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
                  {'Are you sure you want to de-activate '}
                  <Box component={'span'} fontWeight={'bold'}>
                    {highlight}
                  </Box>
                  {'?'}
                </Typography>
              </DialogContentText>
            </Grid>
            <Grid item>
              <DialogContentText>
                {`don't worry, you'll be able to undo this action at any time.`}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deActivateClickHandler();
              closeDialog();
            }}
            className={classes.deActivateButton}
          >
            {'Yes De-Activate'}
          </Button>
          <Button onClick={closeDialog} color={'primary'} autoFocus>
            {'Go Back'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

interface BaseDeleteDialogContentProps {
  highlight: string;
  deActivateClickHandler: () => void;
}
