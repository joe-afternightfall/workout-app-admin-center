import React from 'react';
import { Dispatch } from 'redux';
import {
  workoutCategories,
  WorkoutCategoryVO,
  NightfallSelectDropdown,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import {
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../creators/routine-builder/builder';
import { State } from '../../../../../configs/redux/store';
import { Grid, TextField, Typography } from '@material-ui/core';

function titleRow(
  title: string,
  isEditing: boolean,
  editingComponent: JSX.Element,
  editingTitle: string
): JSX.Element {
  return (
    <Grid item xs={12} container alignItems={'center'}>
      <Grid item xs={6}>
        <Typography variant={'h6'} color={'textSecondary'}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container justify={'flex-end'}>
          {isEditing ? (
            editingComponent
          ) : (
            <Typography variant={'h5'} color={'textPrimary'}>
              {editingTitle}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

const RoutineTitle = ({
  isEditing,
  routineTitle,
  titleChangeHandler,
  categoryChangeHandler,
  selectedWorkoutCategoryId,
}: RoutineTitleProps & PassedInProps): JSX.Element => {
  let subheader = 'select category';
  workoutCategories.find((category) => {
    if (category.id === selectedWorkoutCategoryId) {
      subheader = category.name;
    }
  });
  const title = routineTitle === '' ? 'Setup Routine' : routineTitle;
  const categoryTitle = subheader === '' ? 'select category' : subheader;
  return (
    <Grid container spacing={2} style={{ marginBottom: 16 }}>
      {titleRow(
        'Routine Title',
        isEditing,
        <TextField
          fullWidth
          value={routineTitle}
          placeholder={'Title'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            titleChangeHandler(e.target.value);
          }}
          variant={'filled'}
          label={'Routine title'}
        />,
        title
      )}
      {titleRow(
        'Workout Category',
        isEditing,
        <NightfallSelectDropdown
          id={'workout-category-dropdown'}
          value={selectedWorkoutCategoryId}
          label={'Category'}
          changeHandler={categoryChangeHandler}
          variant={'outlined'}
          data={workoutCategories.map((category: WorkoutCategoryVO) => {
            return {
              id: category.id,
              name: category.name,
            };
          })}
        />,
        categoryTitle
      )}
    </Grid>
  );
};

interface PassedInProps {
  isEditing: boolean;
}

export interface RoutineTitleProps {
  routineTitle: string;
  selectedWorkoutCategoryId: string;
  titleChangeHandler: (value: string) => void;
  categoryChangeHandler: (id: string) => void;
}

const mapStateToProps = (state: State): RoutineTitleProps => {
  const builderState = state.routineBuilderState;
  return {
    routineTitle: builderState.selectedRoutine.name,
    selectedWorkoutCategoryId: builderState.selectedRoutine.workoutCategoryId,
  } as unknown as RoutineTitleProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineTitleProps =>
  ({
    titleChangeHandler: (value: string) => {
      dispatch(updateRoutineTitle(value));
    },
    categoryChangeHandler: (id: string) => {
      dispatch(updateSelectedCategoryId(id));
    },
  } as unknown as RoutineTitleProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineTitle);
