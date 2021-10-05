import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, Grid } from '@material-ui/core';
import InfoCard from './routine-info/InfoCard';
import { Phase } from 'workout-app-common-core';
import { State } from '../../../../configs/redux/store';
import RoutineTitleCard from './title/RoutineTitleCard';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { addPhaseToRoutine } from '../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const RoutineFormView = ({
  phases,
  addPhaseHandler,
}: RoutineFormViewProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={7} container spacing={2}>
        <Grid item xs={12}>
          <RoutineTitleCard />
        </Grid>

        {phases.map((phase: Phase, index: number) => {
          return (
            <Grid item xs={12} key={index}>
              <InfoCard phase={phase} />
            </Grid>
          );
        })}
      </Grid>

      <Grid item xs={1}>
        <Card>
          <ToggleButtonGroup
            orientation="vertical"
            // value={view}
            exclusive
            // onChange={handleChange}
            style={{ width: '100%' }}
          >
            <ToggleButton
              value="list"
              aria-label="list"
              onClick={addPhaseHandler}
            >
              <CalendarViewDayIcon />
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="quilt" aria-label="quilt">
              <ViewQuiltIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>
      </Grid>
    </Grid>
  );
};

export interface RoutineFormViewProps {
  phases: Phase[];
  addPhaseHandler: () => void;
}

const mapStateToProps = (state: State): RoutineFormViewProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineFormViewProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineFormViewProps =>
  ({
    addPhaseHandler: () => {
      dispatch(addPhaseToRoutine());
    },
  } as unknown as RoutineFormViewProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineFormView);
