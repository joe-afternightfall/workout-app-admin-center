import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Phase } from 'workout-app-common-core';
import BuilderCard from './components/BuilderCard';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const RoutineBuilder = ({ phases }: RoutineBuilderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <BuilderCard />

      {/*todo: add muscle selector slide out */}
    </Grid>
  );
};

export interface RoutineBuilderProps {
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
