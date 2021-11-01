import { ThunkAction } from 'redux-thunk';
import { State } from '../../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  FIREBASE_DB_GRIP_TYPES_ROUTE,
  GripTypeDAO,
} from 'workout-app-common-core';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';

export const saveNewGripType =
  (
    value: string,
    description: string,
    iconId: string
  ): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    const ref = firebase.database().ref(FIREBASE_DB_GRIP_TYPES_ROUTE);
    const newRef = ref.push();

    const gripTypeDAO = new GripTypeDAO(
      uuidv4(),
      value,
      description,
      iconId,
      true
    );

    return await newRef.set(gripTypeDAO, (error: Error | null) => {
      if (error) {
        dispatch(
          displayErrorSnackbar(`Error saving grip type ${gripTypeDAO.name}.`)
        );
      } else {
        dispatch(
          displaySuccessSnackbar(`Successfully saved ${gripTypeDAO.name}.`)
        );
      }
    });
  };
