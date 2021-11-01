import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import { GripTypeVO, NightfallDialogContent } from 'workout-app-common-core';
import {
  saveNewGripType,
  updateGripType,
} from '../../../../../../services/workout-configurations/grip-types-service';
import { ThunkDispatch } from 'redux-thunk';

const GripTypeDialog = (props: GripTypeDialogProps & PassedInProps) => {
  const { open, newGripType, selectedGripType, closeDialogHandler } = props;
  const [gripName, setGripName] = useState('');
  const [iconId, setIconId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newGripType && selectedGripType) {
      setGripName(selectedGripType.name);
      setIconId(selectedGripType.iconId);
      setDescription(selectedGripType.description);
    } else {
      setGripName('');
      setIconId('');
      setDescription('');
    }
  }, [newGripType, selectedGripType]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={newGripType ? 'New Grip Type' : 'Update Grip Type'}
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Grip Name'}
                value={gripName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setGripName(e.target.value);
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
                label={'Grip Description'}
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
                disabled={gripName === ''}
                onClick={() => {
                  props.updateClickHandler(gripName, description, iconId);
                }}
              >
                {newGripType ? 'Save' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        }
        closeClickHandler={closeDialogHandler}
      />
    </Dialog>
  );
};

interface GripTypeDialogProps {
  updateClickHandler: (
    gripName: string,
    description: string,
    iconId: string
  ) => void;
}

interface PassedInProps {
  open: boolean;
  newGripType: boolean;
  closeDialogHandler: () => void;
  selectedGripType: GripTypeVO | null;
}

const mapStateToProps = (state: State): GripTypeDialogProps => {
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as GripTypeDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): GripTypeDialogProps =>
  ({
    updateClickHandler: (
      gripName: string,
      description: string,
      iconId: string
    ) => {
      if (!ownProps.newGripType && ownProps.selectedGripType) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateGripType(
            ownProps.selectedGripType.firebaseId,
            gripName,
            description,
            iconId
          )
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      } else {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewGripType(gripName, description, iconId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as GripTypeDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripTypeDialog);
