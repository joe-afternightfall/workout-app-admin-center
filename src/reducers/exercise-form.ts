import { ActionTypes, ApplicationActions } from '../creators/actions';
import { ExerciseVO } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';

export default {
  reducer: (
    state: ExerciseFormState = {} as unknown as ExerciseFormState,
    action: ApplicationActions
  ): ExerciseFormState => {
    let newState = Object.assign({}, state);

    switch (action.type) {
      case ActionTypes.OPEN_NEW_EXERCISE_FORM_DIALOG:
        newState.openExerciseFormDialog = true;
        newState.newExerciseForm = true;
        newState.exerciseForm = {
          firebaseId: '',
          id: uuidv4(),
          name: '',
          description: '',
          equipmentId: '',
          muscleGroupIds: [],
          iconId: '',
          gripTypeId: '',
          gripWidthId: '',
          parameterTypeId: '',
          alternateSides: false,
        };
        break;
      case ActionTypes.OPEN_EDIT_EXERCISE_FORM_DIALOG:
        newState.openExerciseFormDialog = true;
        newState.newExerciseForm = false;
        break;
      case ActionTypes.CLOSE_EXERCISE_FORM_DIALOG:
        newState.openExerciseFormDialog = false;
        break;
      case ActionTypes.SELECT_EXERCISE_PARAM_TYPE: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.parameterTypeId = action.paramType.id;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_ALTERNATE_SIDES_OPTION: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.alternateSides = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_EXERCISE_MUSCLE_ID: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.muscleGroupIds = [action.id];
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_OPTIONAL_EXERCISE_PARAM: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        switch (action.param) {
          case 'gripWidth':
            clonedForm.gripWidthId = action.optionId;
            break;
          case 'gripType':
            clonedForm.gripTypeId = action.optionId;
            break;
          case 'equipment':
            clonedForm.equipmentId = action.optionId;
            break;
          default:
            break;
        }

        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_EXERCISE_NAME: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.name = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      default:
        newState = state;
    }

    return newState;
  },
};

export interface ExerciseFormState {
  openExerciseFormDialog: boolean;
  newExerciseForm: boolean;
  exerciseForm: ExerciseVO;
}
