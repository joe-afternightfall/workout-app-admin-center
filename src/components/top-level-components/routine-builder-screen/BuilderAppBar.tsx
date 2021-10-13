import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import BuildIcon from '@material-ui/icons/Build';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RoutineInfoActionMenu from './routine-info/components/RoutineInfoActionMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
    appBar: {
      backgroundColor: '#009688',
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function BuilderAppBar({
  isEditing,
  editClickHandler,
}: BuilderAppBarProps): JSX.Element {
  const classes = useStyles();

  return (
    <CardHeader
      disableTypography
      className={classes.root}
      title={
        <AppBar position={'relative'} className={classes.appBar}>
          <Toolbar>
            <BuildIcon fontSize={'small'} className={classes.icon} />
            <Typography variant={'h6'} className={classes.title}>
              {'Routine Builder'}
            </Typography>
            {isEditing ? (
              <IconButton
                color={'inherit'}
                onClick={() => {
                  editClickHandler(false);
                }}
              >
                <DoneIcon />
              </IconButton>
            ) : (
              <RoutineInfoActionMenu
                editClickHandler={() => {
                  editClickHandler(true);
                }}
              />
            )}
          </Toolbar>
        </AppBar>
      }
    />
  );
}

interface BuilderAppBarProps {
  isEditing: boolean;
  editClickHandler: (isEditing: boolean) => void;
}
