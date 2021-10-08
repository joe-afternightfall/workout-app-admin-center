import React from 'react';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import ExercisesList from './ExercisesList';
import { AppBar, Toolbar, Typography, Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: '38vw',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
);

export default function SelectorDrawer({ display }: SelectorDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={display}
      anchor={'right'}
      variant={'persistent'}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AppBar position={'relative'}>
        <Toolbar>
          <Typography variant={'h6'} noWrap>
            {'Persistent drawer'}
          </Typography>
        </Toolbar>
      </AppBar>
      <ExercisesList />
    </Drawer>
  );
}

interface SelectorDrawerProps {
  display: boolean;
  toggleHandler: (display: boolean) => void;
}
