import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  ManikinMuscleGroupVO,
  NightfallDialogContent,
} from 'workout-app-common-core';
import { ThunkDispatch } from 'redux-thunk';
import {
  saveNewManikinMuscleGroup,
  updateManikinMuscleGroup,
} from '../../../../../../services/workout-configurations/manikin-muscle-groups-service';

const ManikinMuscleGroupDialog = (
  props: ManikinMuscleGroupDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    closeDialogHandler,
    selectedManikinMuscleGroup,
    newManikinMuscleGroup,
  } = props;
  const [name, setName] = useState('');

  useEffect(() => {
    if (!newManikinMuscleGroup && selectedManikinMuscleGroup) {
      setName(selectedManikinMuscleGroup.name);
    } else {
      setName('');
    }
  }, [newManikinMuscleGroup, selectedManikinMuscleGroup]);

  return (
    <Dialog open={open} onClose={closeDialogHandler} maxWidth={'sm'} fullWidth>
      <NightfallDialogContent
        title={
          newManikinMuscleGroup
            ? 'New Manikin Muscle Group'
            : 'Update Manikin Muscle Group'
        }
        dialogContent={
          <Grid
            container
            spacing={2}
            style={{ minHeight: '20vh' }}
            alignItems={'center'}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Muscle Name'}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
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
                  props.updateClickHandler(name);
                }}
              >
                {newManikinMuscleGroup ? 'Save' : 'Update'}
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
  newManikinMuscleGroup: boolean;
  closeDialogHandler: () => void;
  selectedManikinMuscleGroup: ManikinMuscleGroupVO | null;
}

interface ManikinMuscleGroupDialogProps {
  updateClickHandler: (name: string) => void;
}

const mapStateToProps = (state: State): ManikinMuscleGroupDialogProps => {
  return {
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
  } as unknown as ManikinMuscleGroupDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ManikinMuscleGroupDialogProps =>
  ({
    updateClickHandler: (name: string) => {
      if (
        !ownProps.newManikinMuscleGroup &&
        ownProps.selectedManikinMuscleGroup
      ) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateManikinMuscleGroup(
            ownProps.selectedManikinMuscleGroup.firebaseId,
            name
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewManikinMuscleGroup(name)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as ManikinMuscleGroupDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManikinMuscleGroupDialog);
