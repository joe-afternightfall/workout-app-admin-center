import { ActionTypes, ApplicationActions } from '../creators/actions';

export default {
  reducer: (
    state: ExerciseFormState = {} as unknown as ExerciseFormState,
    action: ApplicationActions
  ): ExerciseFormState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.SET_NEW_OR_EDITING_EXERCISE_FORM:
        newState.newExerciseForm = action.isNewForm;
        break;
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ExerciseFormState {
  newExerciseForm: boolean;
}
