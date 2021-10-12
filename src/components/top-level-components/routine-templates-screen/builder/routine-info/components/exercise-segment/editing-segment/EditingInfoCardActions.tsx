import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'workout-app-common-core';
import { State } from '../../../../../../../../configs/redux/store';
import { Button, CardActions, Divider, Grid } from '@material-ui/core';

const EditingInfoCardActions = ({
  doneHandler,
  doneDisabled,
}: EditingInfoCardActionsProps & PassedInProps): JSX.Element => {
  return (
    <CardActions>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider variant={'middle'} />
        </Grid>
        <Grid item container alignItems={'center'} justify={'flex-end'}>
          <Button
            disabled={doneDisabled}
            color={'primary'}
            onClick={doneHandler}
          >
            {'Done'}
          </Button>
        </Grid>
      </Grid>
    </CardActions>
  );
};

interface PassedInProps {
  segment: Segment;
  doneHandler: () => void;
}

interface EditingInfoCardActionsProps {
  doneDisabled: boolean;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): EditingInfoCardActionsProps => {
  let doneDisabled = true;

  ownProps.segment.exercises.map((workoutExercise) => {
    doneDisabled = workoutExercise.sets.length === 0;
  });

  return {
    doneDisabled: doneDisabled,
  } as unknown as EditingInfoCardActionsProps;
};

export default connect(mapStateToProps)(EditingInfoCardActions);