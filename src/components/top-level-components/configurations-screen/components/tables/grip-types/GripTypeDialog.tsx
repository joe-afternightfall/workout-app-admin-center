import React, { ChangeEvent, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Button, Dialog, Grid, TextField } from '@material-ui/core';
import { NightfallDialogContent } from 'workout-app-common-core';
import { saveNewGripType } from '../../../../../../services/workout-configurations/grip-types-service';
import { ThunkDispatch } from 'redux-thunk';

const GripTypeDialog = (props: GripTypeDialogProps & PassedInProps) => {
  const { open, newGripType, closeDialogHandler } = props;
  const [gripName, setGripName] = useState('');

  return (
    <Dialog open={open}>
      <NightfallDialogContent
        title={'New Grip Type'}
        dialogContent={
          <Grid container>
            <Grid item>
              <TextField
                label={'Grip Name'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setGripName(e.target.value);
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
                  props.updateClickHandler(gripName);
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
  updateClickHandler: (value: string) => void;
}

interface PassedInProps {
  open: boolean;
  newGripType: boolean;
  closeDialogHandler: () => void;
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
      value: string,
      description: string,
      iconId: string
    ) => {
      if (ownProps.newGripType) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewGripType(value, 'description', 'iconId')
        );
      }
      //   dispatch(updateGripType());
      // }
    },
  } as unknown as GripTypeDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripTypeDialog);
