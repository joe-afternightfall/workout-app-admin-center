import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Phase } from 'workout-app-common-core';
import { State } from '../../../../configs/redux/store';
import BuilderCard from './routine-info/RoutineInfoCard';
import SelectorDrawer from './selector-drawer/SelectorDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const RoutineBuilder = ({ phases }: RoutineBuilderProps): JSX.Element => {
  const classes = useStyles();
  const [displayDrawer, setDisplayDrawer] = React.useState(false);

  const toggleSideDrawer = (display: boolean) => {
    setDisplayDrawer(display);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <BuilderCard toggleSideDrawerHandler={toggleSideDrawer} />
      </Grid>

      <Grid item xs={5}>
        <SelectorDrawer
          toggleHandler={toggleSideDrawer}
          display={displayDrawer}
        />
      </Grid>
    </Grid>
  );
};

interface RoutineBuilderProps {
  phases: Phase[];
}

const mapStateToProps = (state: State): RoutineBuilderProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineBuilderProps;
};

const mapDispatchToProps = (): RoutineBuilderProps =>
  ({} as unknown as RoutineBuilderProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineBuilder);
