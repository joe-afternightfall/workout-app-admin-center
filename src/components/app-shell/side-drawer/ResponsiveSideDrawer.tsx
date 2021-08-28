import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { State } from '../../../configs/redux/store';
import PermSideDrawer from './variants/PermSideDrawer';
import TempSideDrawer from './variants/TempSideDrawer';

const drawerSize = (props: { size: string }) => props.size;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerSize,
        flexShrink: 0,
      },
    },
  })
);

const ResponsiveSideDrawer = (
  props: ResponsiveSideDrawerProps
): JSX.Element => {
  const classes = useStyles({
    size: props.drawerSize,
  });

  return (
    <nav className={classes.drawer}>
      <Hidden smUp>
        <TempSideDrawer />
      </Hidden>

      <Hidden only={['xs']}>
        <PermSideDrawer />
      </Hidden>
    </nav>
  );
};

export interface ResponsiveSideDrawerProps {
  drawerSize: string;
}

const mapStateToProps = (state: State): ResponsiveSideDrawerProps => {
  return {
    drawerSize: state.applicationState.drawerSize,
  } as unknown as ResponsiveSideDrawerProps;
};

export default connect(mapStateToProps)(ResponsiveSideDrawer);
