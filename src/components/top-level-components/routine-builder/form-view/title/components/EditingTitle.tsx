import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import {
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../../creators/routine-builder/builder';
import { State } from '../../../../../../configs/redux/store';
import BaseSelectDropdown from '../../base-components/BaseSelectDropdown';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { workoutCategories, WorkoutCategoryVO } from 'workout-app-common-core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const EditingTitle = ({
  routineTitle,
  titleChangeHandler,
  categoryChangeHandler,
  selectedWorkoutCategoryId,
}: EditingTitleProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={routineTitle}
          placeholder={'Title'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            titleChangeHandler(e.target.value);
          }}
          variant={'filled'}
          label={'Routine title'}
        />
      </Grid>
      <Grid item xs={12}>
        <BaseSelectDropdown
          id={'category-select'}
          value={selectedWorkoutCategoryId}
          label={'Category'}
          changeHandler={categoryChangeHandler}
          data={workoutCategories.map((category: WorkoutCategoryVO) => {
            return {
              id: category.id,
              name: category.name,
            };
          })}
        />
      </Grid>
    </Grid>
  );
};

export interface EditingTitleProps {
  routineTitle: string;
  selectedWorkoutCategoryId: string;
  titleChangeHandler: (value: string) => void;
  categoryChangeHandler: (id: string) => void;
}

const mapStateToProps = (state: State): EditingTitleProps => {
  const builderState = state.routineBuilderState;
  return {
    routineTitle: builderState.selectedRoutine.name,
    selectedWorkoutCategoryId: builderState.selectedRoutine.workoutCategoryId,
  } as unknown as EditingTitleProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditingTitleProps =>
  ({
    titleChangeHandler: (value: string) => {
      dispatch(updateRoutineTitle(value));
    },
    categoryChangeHandler: (id: string) => {
      dispatch(updateSelectedCategoryId(id));
    },
  } as unknown as EditingTitleProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditingTitle);
