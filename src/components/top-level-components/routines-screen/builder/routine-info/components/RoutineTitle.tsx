import React from 'react';
import { connect } from 'react-redux';
import { workoutCategories, WorkoutCategoryVO } from 'workout-app-common-core';
import { CardHeader, IconButton, TextField } from '@material-ui/core';
import ActionMenu from './ActionMenu';
import { State } from '../../../../../../configs/redux/store';
import DoneIcon from '@material-ui/icons/Done';
import BaseSelectDropdown from '../../../../../shared/BaseSelectDropdown';
import {
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../../creators/routine-builder/builder';
import { Dispatch } from 'redux';

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
        ) : routineTitle === '' ? (
          'Setup Routine'
        ) : (
          routineTitle
        )
      }
      subheader={
        isEditing ? (
          <BaseSelectDropdown
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
        ) : (
          subheader
        )
      }
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
          <ActionMenu
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
