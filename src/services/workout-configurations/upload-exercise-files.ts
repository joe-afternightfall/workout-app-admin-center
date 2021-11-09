import firebase from 'firebase';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../../creators/app-snackbar';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../configs/redux/store';
import FirebaseStorageError = firebase.storage.FirebaseStorageError;

export const uploadExerciseFiles =
  (): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const folderName = getState().exerciseFormState.exerciseForm.iconId;
    const filesToUpload = getState().exerciseFormState.filesToUpload;
    const errors: FirebaseStorageError[] = [];

    filesToUpload.map(async (file) => {
      return await firebase
        .storage()
        .ref(`exercises/${folderName}/${file.name}`)
        .put(file)
        .catch((error: FirebaseStorageError) => errors.push(error));
    });

    if (errors.length > 0) {
      dispatch(displayErrorSnackbar(`Error saving file ${errors[0].name}.`));
    } else {
      dispatch(
        displaySuccessSnackbar(`Successfully saved images for ${folderName}.`)
      );
    }
  };
