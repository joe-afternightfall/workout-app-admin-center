import React, { ChangeEvent, useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import { GripWidthVO, NightfallDialogContent } from 'workout-app-common-core';
import { ThunkDispatch } from 'redux-thunk';
import {
  saveNewGripWidth,
  updateGripWidth,
} from '../../../../../../services/workout-configurations/grip-widths-service';

const GripWidthDialog = (
  props: GripWidthDialogProps & PassedInProps
): JSX.Element => {
  const { open, closeDialogHandler, selectedGripWidth, newGripWidth } = props;
  const [name, setName] = useState('');
  const [iconId, setIconId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!newGripWidth && selectedGripWidth) {
      setName(selectedGripWidth.name);
      setIconId(selectedGripWidth.iconId);
      setDescription(selectedGripWidth.description);
    } else {
      setName('');
      setIconId('');
      setDescription('');
    }
  }, [newGripWidth, selectedGripWidth]);

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <NightfallDialogContent
        title={newGripWidth ? 'New Grip Width' : 'Update Grip Width'}
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Grip Width'}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
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
                label={'Grip Width Description'}
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
                  props.updateClickHandler(name, description, iconId);
                }}
              >
                {newGripWidth ? 'Save' : 'Update'}
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
  newGripWidth: boolean;
  closeDialogHandler: () => void;
  selectedGripWidth: GripWidthVO | null;
}

interface GripWidthDialogProps {
  updateClickHandler: (
    name: string,
    description: string,
    iconId: string
  ) => void;
}

const mapStateToProps = (state: State): GripWidthDialogProps => {
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as GripWidthDialogProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): GripWidthDialogProps =>
  ({
    updateClickHandler: (
      gripName: string,
      description: string,
      iconId: string
    ) => {
      if (!ownProps.newGripWidth && ownProps.selectedGripWidth) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          updateGripWidth(
            ownProps.selectedGripWidth.firebaseId,
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
          saveNewGripWidth(gripName, description, iconId)
        );
        setTimeout(() => {
          ownProps.closeDialogHandler();
        }, 500);
      }
    },
  } as unknown as GripWidthDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripWidthDialog);
