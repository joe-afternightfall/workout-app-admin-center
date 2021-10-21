import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Segment } from 'workout-app-common-core';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  addSetToEachExerciseInSegment,
  deleteSetFromEachExerciseInSegment,
} from '../../../../../../../../../creators/routine-builder/builder';
import { Grid, IconButton, Typography } from '@material-ui/core';
import LineItemTitle from '../base-components/LineItemTitle';

const SetIncrementer = ({
  segment,
  addHandler,
  deleteHandler,
}: SetIncrementerProps & PassedInProps): JSX.Element => {
  let disableAdd = false;
  let disableDelete = true;

  const workoutExercise = segment.exercises[0];
  const numberOfSets = workoutExercise ? workoutExercise.sets.length : 0;

  if (workoutExercise && workoutExercise.sets.length === 0) {
    disableDelete = true;
  } else if (workoutExercise) {
    disableDelete = false;
  }

  if (workoutExercise && workoutExercise.sets.length === 5) {
    disableAdd = true;
  }
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <LineItemTitle title={'Number of sets'} />
      </Grid>
      <Grid item xs={6} container alignItems={'center'}>
        <Grid item xs={3} container justify={'center'}>
          <IconButton onClick={deleteHandler} disabled={disableDelete}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6} container justify={'center'}>
          <Typography variant={'h5'}>{numberOfSets}</Typography>
        </Grid>
        <Grid item xs={3} container justify={'center'}>
          <IconButton onClick={addHandler} disabled={disableAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  segment: Segment;
}

interface SetIncrementerProps {
  addHandler: () => void;
  deleteHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SetIncrementerProps =>
  ({
    addHandler: () => {
      dispatch(addSetToEachExerciseInSegment(ownProps.segment.id));
    },
    deleteHandler: () => {
      dispatch(deleteSetFromEachExerciseInSegment(ownProps.segment.id));
    },
  } as unknown as SetIncrementerProps);

export default connect(null, mapDispatchToProps)(SetIncrementer);
