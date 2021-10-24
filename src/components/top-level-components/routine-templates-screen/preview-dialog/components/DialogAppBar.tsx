import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      flex: 1,
    },
  })
);

export default function DialogAppBar({
  title,
  subtitle,
  closeHandler,
}: DialogAppBarProps): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid className={classes.title} container>
          <Grid item xs={12}>
            <Typography variant={'h6'}>{`${title} Template`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'body2'}>{`${subtitle}`}</Typography>
          </Grid>
        </Grid>
        <IconButton edge={'start'} color={'inherit'} onClick={closeHandler}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

interface DialogAppBarProps {
  title: string;
  subtitle: string;
  closeHandler: () => void;
}
