import React from 'react';
import {
  Box,
  Button,
  Typography,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseDialogTitle from './BaseDialogTitle';

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

export default function BaseDeleteDialogContent({
  highlight,
  closeHandler,
  deleteHandler,
}: BaseDeleteDialogContentProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <BaseDialogTitle title={'Hold Up!'} closeClickHandler={closeHandler} />
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
                {'Are you sure you want to delete '}
                <Box component={'span'} fontWeight={'bold'}>
                  {highlight}
                </Box>
                {'?'}
              </Typography>
            </DialogContentText>
          </Grid>
          <Grid item>
            <DialogContentText>
              {'This action can not be undone.'}
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            deleteHandler();
            closeHandler();
          }}
          className={classes.deleteButton}
        >
          {'Yes Delete'}
        </Button>
        <Button onClick={closeHandler} color={'primary'} autoFocus>
          {'Go Back'}
        </Button>
      </DialogActions>
    </>
  );
}

interface BaseDeleteDialogContentProps {
  highlight: string;
  closeHandler: () => void;
  deleteHandler: () => void;
}
