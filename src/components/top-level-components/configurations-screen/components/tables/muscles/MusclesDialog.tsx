import {
  Grid,
  Dialog,
  Select,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import {
  MuscleVO,
  ManikinMuscleGroupVO,
  NightfallDialogContent,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  updateMuscle,
  saveNewMuscle,
} from '../../../../../../services/workout-configurations/muscles-service';

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
  const selectMuscle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setManikinGroupId(event.target.value as string);
  };

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
    <Dialog open={open} onClose={closeDialogHandler} maxWidth={'sm'} fullWidth>
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
              <FormControl fullWidth>
                <InputLabel id={'manikin-muscle-label'}>
                  {'Manikin Muscle'}
                </InputLabel>
                <Select
                  labelId={'manikin-muscle-label'}
                  id={'manikin-muscle-select'}
                  value={manikinGroupId}
                  onChange={selectMuscle}
                >
                  <MenuItem disabled value={''}>
                    <em>{'Muscle List'}</em>
                  </MenuItem>
                  {manikinMuscleGroups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
