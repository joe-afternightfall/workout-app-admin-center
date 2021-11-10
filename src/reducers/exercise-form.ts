import { ActionTypes, ApplicationActions } from '../creators/actions';
import { ExerciseVO } from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';
import { primaryMuscle, secondaryMuscle } from '../utils/object-builder';

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
          extraInfo: [],
          manikinMuscleGroupIds: [],
          workoutEquipmentIds: [],
          musclesWorked: {
            primary: [],
            secondary: [],
          },
          iconId: '',
          gripTypeId: '',
          gripWidthId: '',
          parameterTypeId: '',
          alternateSides: false,
          active: true,
        };
        break;
      case ActionTypes.OPEN_EDIT_EXERCISE_FORM_DIALOG:
        newState.openExerciseFormDialog = true;
        newState.newExerciseForm = false;
        newState.exerciseForm = action.selectedExercise;
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
        clonedForm.manikinMuscleGroupIds.push(action.id);
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
            clonedForm.workoutEquipmentIds.push(action.optionId);
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
      case ActionTypes.UPDATE_EXERCISE_DESCRIPTION: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.description = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_INFO: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        newState.exerciseForm = clonedForm;
        const foundInfo = clonedForm.extraInfo.find(
          (info) => info.id === action.infoId
        );
        if (foundInfo) {
          foundInfo[action.field] = action.value;
        }
        break;
      }
      case ActionTypes.ADD_INFO_PARAGRAPH: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        const newInfo = {
          id: uuidv4(),
          title: '',
          paragraph: '',
        };
        clonedForm.extraInfo
          ? clonedForm.extraInfo.push(newInfo)
          : (clonedForm.extraInfo = [newInfo]);
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.REMOVE_INFO: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        const foundInfo = clonedForm.extraInfo.find(
          (info) => info.id === action.id
        );
        if (foundInfo) {
          const foundIndex = clonedForm.extraInfo.indexOf(foundInfo);
          if (foundIndex !== -1) {
            clonedForm.extraInfo.splice(foundIndex, 1);
          }
        }
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_EXERCISE_ICON_ID: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.iconId = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_EXERCISE_EQUIPMENT_LIST_IDS: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.workoutEquipmentIds = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_EXERCISE_MANIKIN_MUSCLE_GROUP_IDS: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.manikinMuscleGroupIds = action.value;
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.ADD_PRIMARY_MUSCLE_TARGET: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        if (clonedForm.musclesWorked) {
          if (clonedForm.musclesWorked.primary) {
            const order = clonedForm.musclesWorked.primary.length + 1;
            clonedForm.musclesWorked.primary.push(primaryMuscle(order));
          } else {
            clonedForm.musclesWorked.primary = [primaryMuscle(1)];
          }
        } else {
          clonedForm.musclesWorked = {
            primary: [primaryMuscle(1)],
            secondary: [],
          };
        }
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.ADD_SECONDARY_MUSCLE_TARGET: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        if (clonedForm.musclesWorked) {
          if (clonedForm.musclesWorked.secondary) {
            const order = clonedForm.musclesWorked.secondary.length + 1;
            clonedForm.musclesWorked.secondary.push(secondaryMuscle(order));
          } else {
            clonedForm.musclesWorked.secondary = [secondaryMuscle(1)];
          }
        } else {
          clonedForm.musclesWorked = {
            primary: [],
            secondary: [secondaryMuscle(1)],
          };
        }

        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.DELETE_PRIMARY_MUSCLE_TARGET: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.musclesWorked.primary.map((primary) => {
          if (primary.id === action.primaryMuscle.id) {
            const foundIndex =
              clonedForm.musclesWorked.primary.indexOf(primary);
            clonedForm.musclesWorked.primary.splice(foundIndex, 1);
          }
        });
        clonedForm.musclesWorked.primary.map((primary, index) => {
          primary.order = index + 1;
        });
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.DELETE_SECONDARY_MUSCLE_TARGET: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.musclesWorked.secondary.map((secondary) => {
          if (secondary.id === action.secondaryMuscle.id) {
            const foundIndex =
              clonedForm.musclesWorked.secondary.indexOf(secondary);
            clonedForm.musclesWorked.secondary.splice(foundIndex, 1);
          }
        });
        clonedForm.musclesWorked.secondary.map((primary, index) => {
          primary.order = index + 1;
        });
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_PRIMARY_MUSCLE: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.musclesWorked.primary.find((primary) => {
          if (primary.id === action.primaryId) {
            primary.muscleId = action.value;
          }
        });
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_SECONDARY_MUSCLE: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.musclesWorked.secondary.find((secondary) => {
          if (secondary.id === action.secondaryId) {
            secondary.muscleId = action.value;
          }
        });
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.SELECT_SECONDARY_TARGET_TYPE: {
        const clonedForm = ramda.clone(newState.exerciseForm);
        clonedForm.musclesWorked.secondary.find((secondary) => {
          if (secondary.id === action.secondaryId) {
            secondary.muscleTargetTypeId = action.value;
          }
        });
        newState.exerciseForm = clonedForm;
        break;
      }
      case ActionTypes.UPDATE_FILES_TO_UPLOAD:
        newState.filesToUpload = action.files;
        break;
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
  filesToUpload: File[];
}
