import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  NightfallDialogContent,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import {
  saveNewWorkoutEquipmentItem,
  updateWorkoutEquipmentItem,
} from '../../../../../../services/workout-configurations/workout-equipment-service';

const WorkoutEquipmentDialog = (
  props: WorkoutEquipmentDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    newWorkoutEquipment,
    selectedWorkoutEquipment,
    closeDialogHandler,
  } = props;
  const [workoutEquipmentName, setWorkoutEquipmentName] = useState('');
  const [iconId, setIconId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newWorkoutEquipment && selectedWorkoutEquipment) {
      setWorkoutEquipmentName(selectedWorkoutEquipment.name);
      setIconId(selectedWorkoutEquipment.iconId);
      setDescription(selectedWorkoutEquipment.description);
    } else {
      setWorkoutEquipmentName('');
      setIconId('');
      setDescription('');
    }
  }, [newWorkoutEquipment, selectedWorkoutEquipment]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={
          newWorkoutEquipment
            ? 'New Piece of Workout Equipment'
            : 'Update Workout Equipment'
        }
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Workout Equipment Name'}
                value={workoutEquipmentName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setWorkoutEquipmentName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Icon ID'}
                value={iconId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setIconId(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Workout Equipment Description'}
                multiline
                rows={4}
                variant={'filled'}
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        }
        dialogActions={
          <Grid container justify={'flex-end'}>
            <Grid item>
              <Button
                disabled={workoutEquipmentName === ''}
                onClick={() => {
                  props.updateClickHandler(
                    workoutEquipmentName,
                    description,
                    iconId
                  );
                }}
              >
                {newWorkoutEquipment ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        }
        closeClickHandler={closeDialogHandler}
      />
    </Dialog>
  );
};

interface WorkoutEquipmentDialogProps {
  updateClickHandler: (
    name: string,
    description: string,
    iconId: string
  ) => void;
}

interface PassedInProps {
  open: boolean;
  newWorkoutEquipment: boolean;
  closeDialogHandler: () => void;
  selectedWorkoutEquipment: WorkoutEquipmentVO | null;
}

const mapStateToProps = (state: State): WorkoutEquipmentDialogProps => {
  return {
    workoutEquipment:
      state.applicationState.workoutConfigurations.workoutEquipment,
  } as unknown as WorkoutEquipmentDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): WorkoutEquipmentDialogProps =>
  ({
    updateClickHandler: (name: string, description: string, iconId: string) => {
      if (!ownProps.newWorkoutEquipment && ownProps.selectedWorkoutEquipment) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateWorkoutEquipmentItem(
            ownProps.selectedWorkoutEquipment.firebaseId,
            name,
            description,
            iconId
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewWorkoutEquipmentItem(name, description, iconId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as WorkoutEquipmentDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutEquipmentDialog);
