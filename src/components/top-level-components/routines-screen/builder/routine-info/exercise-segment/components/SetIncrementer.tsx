import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import {
  addSetToEachExerciseInSegment,
  deleteSetFromEachExerciseInSegment,
} from '../../../../../../../creators/routine-builder/builder';

const SetIncrementer = ({
  segment,
  addHandler,
  deleteHandler,
}: SetIncrementerProps & PassedInProps): JSX.Element => {
  const numberOfSets = segment.exercises[0]
    ? segment.exercises[0].sets.length
    : 0;
  let disableDelete = true;
  let disableAdd = false;
  if (segment.exercises[0]) {
    disableDelete = false;
  }
  if (segment.exercises[0] && segment.exercises[0].sets.length === 0) {
    disableDelete = true;
  }

  if (segment.exercises[0] && segment.exercises[0].sets.length === 5) {
    disableAdd = true;
  }
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <Typography variant={'subtitle1'} color={'textSecondary'}>
          {'Number of sets'}
        </Typography>
      </Grid>
      <Grid item xs={6} container alignItems={'center'} justify={'flex-end'}>
        <Grid item>
          <IconButton onClick={deleteHandler} disabled={disableDelete}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} container justify={'center'}>
          <Typography variant={'h6'}>{numberOfSets}</Typography>
        </Grid>
        <Grid item>
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

export interface SetIncrementerProps {
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
