import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Navigation from '../components/Navigation';
import { State } from '../../../../configs/redux/store';
import SideDrawerAppBar from '../components/SideDrawerAppBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { closeSideDrawer } from '../../../../creators/side-drawer';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: 240,
    },
  })
);

const TempSideDrawer = (props: TempSideDrawerProps): JSX.Element => {
  const { open } = props;
  const classes = useStyles();

  return (
    <Drawer
      variant={'temporary'}
      anchor={'left'}
      open={open}
      onClose={props.closeSideDrawerHandler}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      data-testid={'temp-side-drawer'}
    >
      <SideDrawerAppBar />

      <Navigation tempDrawer={true} />
    </Drawer>
  );
};

export interface TempSideDrawerProps {
  open: boolean;
  closeSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): TempSideDrawerProps => {
  return {
    open: state.applicationState.sideDrawerIsOpen,
  } as unknown as TempSideDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TempSideDrawerProps =>
  ({
    closeSideDrawerHandler: (): void => {
      dispatch(closeSideDrawer());
    },
  } as unknown as TempSideDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(TempSideDrawer);
