import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  MuscleTargetTypeVO,
  NightfallDialogContent,
} from 'workout-app-common-core';
import { ThunkDispatch } from 'redux-thunk';
import {
  saveNewMuscleTargetType,
  updateMuscleTargetType,
} from '../../../../../../services/workout-configurations/muscle-target-types-service';

const MuscleTargetTypesDialog = (
  props: MuscleTargetTypesDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    closeDialogHandler,
    selectedMuscleTargetType,
    newMuscleTargetType,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newMuscleTargetType && selectedMuscleTargetType) {
      setName(selectedMuscleTargetType.name);
      setDescription(selectedMuscleTargetType.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [newMuscleTargetType, selectedMuscleTargetType]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={
          newMuscleTargetType
            ? 'New Muscle Target Type'
            : 'Update Muscle Target Type'
        }
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Muscle Target Type Name'}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Muscle Target Type Description'}
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
                disabled={name === ''}
                onClick={() => {
                  props.updateClickHandler(name, description);
                }}
              >
                {newMuscleTargetType ? 'Save' : 'Update'}
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
  newMuscleTargetType: boolean;
  closeDialogHandler: () => void;
  selectedMuscleTargetType: MuscleTargetTypeVO | null;
}

interface MuscleTargetTypesDialogProps {
  updateClickHandler: (name: string, description: string) => void;
}

const mapStateToProps = (state: State): MuscleTargetTypesDialogProps => {
  return {
    muscleTargetTypes:
      state.applicationState.workoutConfigurations.muscleTargetTypes,
  } as unknown as MuscleTargetTypesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): MuscleTargetTypesDialogProps =>
  ({
    updateClickHandler: (name: string, description: string) => {
      if (!ownProps.newMuscleTargetType && ownProps.selectedMuscleTargetType) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateMuscleTargetType(
            ownProps.selectedMuscleTargetType.firebaseId,
            name,
            description
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewMuscleTargetType(name, description)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as MuscleTargetTypesDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuscleTargetTypesDialog);
