import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  NightfallDialogContent,
  ParameterTypeVO,
} from 'workout-app-common-core';
import { ThunkDispatch } from 'redux-thunk';
import {
  saveNewParameterType,
  updateParameterType,
} from '../../../../../../services/workout-configurations/parameter-types-service';

const ParameterTypesDialog = (
  props: ParameterTypesDialogProps & PassedInProps
): JSX.Element => {
  const { open, closeDialogHandler, selectedParameterType, newParameterType } =
    props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newParameterType && selectedParameterType) {
      setName(selectedParameterType.name);
      setDescription(selectedParameterType.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [newParameterType, selectedParameterType]);

  return (
    <Dialog open={open} onClose={closeDialogHandler} maxWidth={'sm'} fullWidth>
      <NightfallDialogContent
        title={
          newParameterType ? 'New Parameter Type' : 'Update Parameter Type'
        }
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Parameter Type Title'}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={'Parameter Type Description'}
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
                {newParameterType ? 'Save' : 'Update'}
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
  newParameterType: boolean;
  closeDialogHandler: () => void;
  selectedParameterType: ParameterTypeVO | null;
}

interface ParameterTypesDialogProps {
  updateClickHandler: (name: string, description: string) => void;
}

const mapStateToProps = (state: State): ParameterTypesDialogProps => {
  return {
    parameterTypes: state.applicationState.workoutConfigurations.parameterTypes,
  } as unknown as ParameterTypesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ParameterTypesDialogProps =>
  ({
    updateClickHandler: (gripName: string, description: string) => {
      if (!ownProps.newParameterType && ownProps.selectedParameterType) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateParameterType(
            ownProps.selectedParameterType.firebaseId,
            gripName,
            description
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewParameterType(gripName, description)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as ParameterTypesDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterTypesDialog);
