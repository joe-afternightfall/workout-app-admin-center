import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Segment } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { Button, CardActions, Divider, Grid } from '@material-ui/core';
import { selectPhase } from '../../../../../../creators/routine-builder/builder';

const ExerciseInfoCardActions = ({
  doneDisabled,
}: ExerciseInfoCardActionsProps & PassedInProps): JSX.Element => {
  return (
    <CardActions>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider variant={'middle'} />
        </Grid>
        <Grid item container alignItems={'center'} justify={'flex-end'}>
          <Button disabled={doneDisabled} color={'primary'}>
            {'Done'}
          </Button>
        </Grid>
      </Grid>
    </CardActions>
  );
};

interface PassedInProps {
  segment: Segment;
}

interface ExerciseInfoCardActionsProps {
  doneDisabled: boolean;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): ExerciseInfoCardActionsProps => {
  let doneDisabled = true;

  ownProps.segment.exercises.map((workoutExercise) => {
    doneDisabled = workoutExercise.sets.length === 0;
  });

  return {
    doneDisabled: doneDisabled,
  } as unknown as ExerciseInfoCardActionsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseInfoCardActionsProps =>
  ({
    changeHandler: (workoutPhaseId: string, phaseId: string) => {
      dispatch(selectPhase(workoutPhaseId, phaseId));
    },
  } as unknown as ExerciseInfoCardActionsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseInfoCardActions);
