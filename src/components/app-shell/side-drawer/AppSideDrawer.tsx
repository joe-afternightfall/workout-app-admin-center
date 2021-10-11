import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Navigation from './components/Navigation';
import SideDrawerAppBar from './components/SideDrawerAppBar';
import { MIN_DRAWER_WIDTH } from '../../../configs/constants/app';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = MIN_DRAWER_WIDTH;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: (props: { size: string }) => props.size,
    },
  })
);

export default function AppSideDrawer(): JSX.Element {
  const classes = useStyles({
    size: drawerWidth,
  });

  return (
    <nav className={classes.root}>
      <Drawer
        open
        anchor={'left'}
        variant={'permanent'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SideDrawerAppBar />

        <Navigation tempDrawer={true} />
      </Drawer>
    </nav>
  );
}
