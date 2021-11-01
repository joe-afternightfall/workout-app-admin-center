import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  ManikinMuscleGroupVO,
  MuscleVO,
  NightfallDialogContent,
} from 'workout-app-common-core';
import { ThunkDispatch } from 'redux-thunk';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  saveNewMuscle,
  updateMuscle,
} from '../../../../../../services/workout-configurations/muscles-service';

function buildOptions(group: ManikinMuscleGroupVO): {
  firebaseId: string;
  id: string;
  name: string;
  active: boolean;
  firstLetter: string;
} {
  const firstLetter = group.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...group,
  };
}

const MusclesDialog = (
  props: MusclesDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    closeDialogHandler,
    manikinMuscleGroups,
    selectedMuscle,
    newMuscle,
  } = props;
  const [name, setName] = useState('');
  const [manikinGroupId, setManikinGroupId] = useState('');
  let defaultValue = null;

  const options = manikinMuscleGroups.map((group: ManikinMuscleGroupVO) => {
    return buildOptions(group);
  });

  manikinMuscleGroups.find((group) => {
    if (selectedMuscle && group.id === selectedMuscle.manikinMuscleGroupId) {
      return (defaultValue = buildOptions(group));
    }
  });

  useEffect(() => {
    if (!newMuscle && selectedMuscle) {
      setName(selectedMuscle.name);
      setManikinGroupId(selectedMuscle.manikinMuscleGroupId);
    } else {
      setName('');
      setManikinGroupId('');
    }
  }, [newMuscle, selectedMuscle]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={newMuscle ? 'New Muscle' : 'Update Muscle'}
        dialogContent={
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                value={defaultValue}
                id={'manikin-muscles'}
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={'Manikin Muscle Group'}
                    variant={'outlined'}
                  />
                )}
                onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
                  newValue && setManikinGroupId(newValue.id);
                }}
                getOptionSelected={(option, value) => option.id === value.id}
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
                  props.updateClickHandler(name, manikinGroupId);
                }}
              >
                {newMuscle ? 'Save' : 'Update'}
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
  newMuscle: boolean;
  closeDialogHandler: () => void;
  selectedMuscle: MuscleVO | null;
}

interface MusclesDialogProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
  updateClickHandler: (name: string, manikinGroupId: string) => void;
}

const mapStateToProps = (state: State): MusclesDialogProps => {
  return {
    muscles: state.applicationState.workoutConfigurations.muscles,
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
  } as unknown as MusclesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): MusclesDialogProps =>
  ({
    updateClickHandler: (name: string, manikinGroupId: string) => {
      if (!ownProps.newMuscle && ownProps.selectedMuscle) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateMuscle(ownProps.selectedMuscle.firebaseId, name, manikinGroupId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewMuscle(name, manikinGroupId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as MusclesDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(MusclesDialog);
