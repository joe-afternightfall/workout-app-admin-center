import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../../../../configs/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import {
  NightfallDialogContent,
  TrainingSetTypeVO,
} from 'workout-app-common-core';
import {
  saveNewTrainingSetType,
  updateTrainingSetType,
} from '../../../../../../services/workout-configurations/training-set-types-service';

const TrainingSetTypesDialog = (
  props: TrainingSetTypesDialogProps & PassedInProps
): JSX.Element => {
  const {
    open,
    newTrainingSetType,
    selectedTrainingSetType,
    closeDialogHandler,
  } = props;
  const [trainingSetTypeName, setTrainingSetTypeName] = useState('');
  const [iconId, setIconId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newTrainingSetType && selectedTrainingSetType) {
      setTrainingSetTypeName(selectedTrainingSetType.name);
      setIconId(selectedTrainingSetType.iconId);
      setDescription(selectedTrainingSetType.description);
    } else {
      setTrainingSetTypeName('');
      setIconId('');
      setDescription('');
    }
  }, [newTrainingSetType, selectedTrainingSetType]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={
          newTrainingSetType
            ? 'New Training Set Type'
            : 'Update Training Set Type'
        }
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Training Set Type Name'}
                value={trainingSetTypeName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTrainingSetTypeName(e.target.value);
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
                label={'Training Set Type Description'}
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
                disabled={trainingSetTypeName === ''}
                onClick={() => {
                  props.updateClickHandler(
                    trainingSetTypeName,
                    description,
                    iconId
                  );
                }}
              >
                {newTrainingSetType ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        }
        closeClickHandler={closeDialogHandler}
      />
    </Dialog>
  );
};

interface TrainingSetTypesDialogProps {
  updateClickHandler: (
    name: string,
    description: string,
    iconId: string
  ) => void;
}

interface PassedInProps {
  open: boolean;
  newTrainingSetType: boolean;
  closeDialogHandler: () => void;
  selectedTrainingSetType: TrainingSetTypeVO | null;
}

const mapStateToProps = (state: State): TrainingSetTypesDialogProps => {
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as TrainingSetTypesDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): TrainingSetTypesDialogProps =>
  ({
    updateClickHandler: (name: string, description: string, iconId: string) => {
      if (!ownProps.newTrainingSetType && ownProps.selectedTrainingSetType) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateTrainingSetType(
            ownProps.selectedTrainingSetType.firebaseId,
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
          saveNewTrainingSetType(name, description, iconId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as TrainingSetTypesDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingSetTypesDialog);
