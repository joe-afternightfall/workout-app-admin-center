import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import { NightfallDialogContent, PhaseVO } from 'workout-app-common-core';
import {
  updatePhase,
  saveNewPhase,
} from '../../../../../../services/workout-configurations/phases-service';

const PhasesDialog = (
  props: PhasesDialogProps & PassedInProps
): JSX.Element => {
  const { open, newPhase, selectedPhase, closeDialogHandler } = props;
  const [phaseName, setPhaseName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newPhase && selectedPhase) {
      setPhaseName(selectedPhase.name);
      setDescription(selectedPhase.description);
    } else {
      setPhaseName('');
      setDescription('');
    }
  }, [newPhase, selectedPhase]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={newPhase ? 'New Phase' : 'Update Phase'}
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Phase Name'}
                value={phaseName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPhaseName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Phase Description'}
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
                disabled={phaseName === ''}
                onClick={() => {
                  props.updateClickHandler(phaseName, description);
                }}
              >
                {newPhase ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        }
        closeClickHandler={closeDialogHandler}
      />
    </Dialog>
  );
};

interface PhasesDialogProps {
  updateClickHandler: (name: string, description: string) => void;
}

interface PassedInProps {
  open: boolean;
  newPhase: boolean;
  closeDialogHandler: () => void;
  selectedPhase: PhaseVO | null;
}

const mapStateToProps = (state: State): PhasesDialogProps => {
  return {
    phases: state.applicationState.workoutConfigurations.phases,
  } as unknown as PhasesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): PhasesDialogProps =>
  ({
    updateClickHandler: (name: string, description: string) => {
      if (!ownProps.newPhase && ownProps.selectedPhase) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updatePhase(ownProps.selectedPhase.firebaseId, name, description)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewPhase(name, description)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as PhasesDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(PhasesDialog);
