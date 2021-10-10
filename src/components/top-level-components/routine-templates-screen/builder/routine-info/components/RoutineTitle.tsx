import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import RoutineInfoActionMenu from './RoutineInfoActionMenu';
import DoneIcon from '@material-ui/icons/Done';
import {
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../../creators/routine-builder/builder';
import { State } from '../../../../../../configs/redux/store';
import { CardHeader, Grid, IconButton, TextField } from '@material-ui/core';
import {
  workoutCategories,
  WorkoutCategoryVO,
  NightfallSelectDropdown,
} from 'workout-app-common-core';

const RoutineTitle = ({
  routineTitle,
  titleChangeHandler,
  categoryChangeHandler,
  selectedWorkoutCategoryId,
}: RoutineTitleProps): JSX.Element => {
  let subheader = 'select category';
  const [isEditing, setIsEditing] = React.useState(false);

  workoutCategories.find((category) => {
    if (category.id === selectedWorkoutCategoryId) {
      subheader = category.name;
    }
  });

  return (
    <CardHeader
      disableTypography={isEditing}
      title={
        isEditing ? (
          <Grid container spacing={2}>
            <Grid item xs={8} sm={8}>
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
            <Grid item xs={8} sm={8}>
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
              />
            </Grid>
          </Grid>
        ) : routineTitle === '' ? (
          'Setup Routine'
        ) : (
          routineTitle
        )
      }
      subheader={isEditing ? undefined : subheader}
      action={
        isEditing ? (
          <IconButton
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <RoutineInfoActionMenu
            editClickHandler={() => {
              setIsEditing(true);
            }}
          />
        )
      }
    />
  );
};

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
