import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import ColorSelector from './color-selector/ColorSelector';
import { WorkoutCategoryVO } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { NightfallDialogContent } from 'workout-app-common-core';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import ManikinMuscleSelector from './manikin-muscles/ManikinMuscleSelector';
import {
  saveNewWorkoutCategory,
  updateWorkoutCategory,
} from '../../../../../../services/workout-configurations/workout-categories-service';

const WorkoutCategoriesDialog = (
  props: WorkoutCategoriesDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    newWorkoutCategory,
    closeDialogHandler,
    selectedWorkoutCategory,
    workoutCategories,
  } = props;

  const [workoutCategoryName, setWorkoutCategoryName] = useState('');
  const [colorId, setColorId] = useState('');
  const [manikinMuscleGroupIds, setManikinMuscleGroupIds] = useState<string[]>(
    []
  );

  const chosenColorIds = workoutCategories.map((category) => category.color);

  const selectColorId = (colorId: string) => {
    setColorId(colorId);
  };

  const selectMuscle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setManikinMuscleGroupIds(event.target.value as string[]);
  };

  useEffect(() => {
    if (!newWorkoutCategory && selectedWorkoutCategory) {
      setWorkoutCategoryName(selectedWorkoutCategory.name);
      setColorId(selectedWorkoutCategory.color);
      setManikinMuscleGroupIds(selectedWorkoutCategory.manikinMuscleGroupIds);
    } else {
      setWorkoutCategoryName('');
      setColorId('');
      setManikinMuscleGroupIds([]);
    }
  }, [newWorkoutCategory, selectedWorkoutCategory]);

  return (
    <Dialog open={open} onClose={closeDialogHandler} maxWidth={'md'} fullWidth>
      <NightfallDialogContent
        title={
          newWorkoutCategory
            ? 'New Workout Category'
            : 'Update Workout Category'
        }
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label={'Workout Category Name'}
                value={workoutCategoryName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setWorkoutCategoryName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <ColorSelector
                  selectedColorId={colorId}
                  chosenColorIds={chosenColorIds}
                  selectColorHandler={selectColorId}
                />
              </Grid>
              <Grid item xs={6}>
                <ManikinMuscleSelector
                  selectMuscleHandler={selectMuscle}
                  selectedMuscleIds={manikinMuscleGroupIds}
                />
              </Grid>
            </Grid>
          </Grid>
        }
        dialogActions={
          <Grid container justify={'flex-end'}>
            <Grid item>
              <Button
                disabled={workoutCategoryName === ''}
                onClick={() => {
                  props.updateClickHandler(
                    workoutCategoryName,
                    colorId,
                    manikinMuscleGroupIds
                  );
                }}
              >
                {newWorkoutCategory ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        }
        closeClickHandler={closeDialogHandler}
      />
    </Dialog>
  );
};

interface PassedInProps {
  open: boolean;
  newWorkoutCategory: boolean;
  closeDialogHandler: () => void;
  selectedWorkoutCategory: WorkoutCategoryVO | null;
}

interface WorkoutCategoriesDialogProps {
  updateClickHandler: (
    name: string,
    color: string,
    manikinMuscleGroupIds: string[]
  ) => void;
  workoutCategories: WorkoutCategoryVO[];
}

const mapStateToProps = (state: State): WorkoutCategoriesDialogProps => {
  return {
    workoutCategories:
      state.applicationState.workoutConfigurations.workoutCategories,
  } as unknown as WorkoutCategoriesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): WorkoutCategoriesDialogProps =>
  ({
    updateClickHandler: (
      name: string,
      color: string,
      manikinMuscleGroupIds: string[]
    ) => {
      if (!ownProps.newWorkoutCategory && ownProps.selectedWorkoutCategory) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateWorkoutCategory(
            ownProps.selectedWorkoutCategory.firebaseId,
            name,
            color,
            manikinMuscleGroupIds
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewWorkoutCategory(name, color, manikinMuscleGroupIds)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as WorkoutCategoriesDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutCategoriesDialog);
