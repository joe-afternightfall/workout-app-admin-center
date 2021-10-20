import { ExerciseVO, ParameterType } from 'workout-app-common-core';
import { ActionTypes } from '../actions';

export interface OpenNewExerciseFormDialogAction {
  type: ActionTypes.OPEN_NEW_EXERCISE_FORM_DIALOG;
}

export const openNewExerciseFormDialog =
  (): OpenNewExerciseFormDialogAction => {
    return {
      type: ActionTypes.OPEN_NEW_EXERCISE_FORM_DIALOG,
    };
  };

export interface OpenEditingExerciseFormDialogAction {
  type: ActionTypes.OPEN_EDIT_EXERCISE_FORM_DIALOG;
  selectedExercise: ExerciseVO;
}

export const openEditingExerciseFormDialog = (
  selectedExercise: ExerciseVO
): OpenEditingExerciseFormDialogAction => {
  return {
    type: ActionTypes.OPEN_EDIT_EXERCISE_FORM_DIALOG,
    selectedExercise: selectedExercise,
  };
};

export interface CloseExerciseFormDialogAction {
  type: ActionTypes.CLOSE_EXERCISE_FORM_DIALOG;
}

export const closeExerciseFormDialog = (): CloseExerciseFormDialogAction => {
  return {
    type: ActionTypes.CLOSE_EXERCISE_FORM_DIALOG,
  };
};

export interface SetNewOrEditingExerciseFormAction {
  type: ActionTypes.SET_NEW_OR_EDITING_EXERCISE_FORM;
  isNewForm: boolean;
}

export const setNewOrEditingExerciseForm = (isNewForm: boolean) => {
  return {
    type: ActionTypes.SET_NEW_OR_EDITING_EXERCISE_FORM,
    isNewForm: isNewForm,
  };
};

export interface SelectExerciseParamTypeAction {
  type: ActionTypes.SELECT_EXERCISE_PARAM_TYPE;
  paramType: ParameterType;
}

export const selectExerciseParamType = (
  paramType: ParameterType
): SelectExerciseParamTypeAction => {
  return {
    type: ActionTypes.SELECT_EXERCISE_PARAM_TYPE,
    paramType: paramType,
  };
};

export interface SelectAlternateSidesOptionAction {
  type: ActionTypes.SELECT_ALTERNATE_SIDES_OPTION;
  value: boolean;
}

export const selectAlternateSidesOption = (
  value: boolean
): SelectAlternateSidesOptionAction => {
  return {
    type: ActionTypes.SELECT_ALTERNATE_SIDES_OPTION,
    value: value,
  };
};

export interface SelectExerciseMuscleIdAction {
  type: ActionTypes.SELECT_EXERCISE_MUSCLE_ID;
  id: string;
}

export const selectExerciseMuscleId = (
  id: string
): SelectExerciseMuscleIdAction => {
  return {
    type: ActionTypes.SELECT_EXERCISE_MUSCLE_ID,
    id: id,
  };
};

export interface SelectOptionalExerciseParamAction {
  type: ActionTypes.SELECT_OPTIONAL_EXERCISE_PARAM;
  param: 'gripWidth' | 'gripType' | 'equipment';
  optionId: string;
}

export const selectOptionalExerciseParam = (
  param: 'gripWidth' | 'gripType' | 'equipment',
  optionId: string
): SelectOptionalExerciseParamAction => {
  return {
    type: ActionTypes.SELECT_OPTIONAL_EXERCISE_PARAM,
    param: param,
    optionId: optionId,
  };
};

export interface UpdateExerciseNameAction {
  type: ActionTypes.UPDATE_EXERCISE_NAME;
  value: string;
}

export const updateExerciseName = (value: string): UpdateExerciseNameAction => {
  return {
    type: ActionTypes.UPDATE_EXERCISE_NAME,
    value: value,
  };
};

export interface SaveExerciseInfoAction {
  type: ActionTypes.SAVE_EXERCISE_INFO;
}

export const saveExerciseInfo = (): SaveExerciseInfoAction => {
  return {
    type: ActionTypes.SAVE_EXERCISE_INFO,
  };
};

export interface ClearExerciseInfoAction {
  type: ActionTypes.CLEAR_EXERCISE_FORM;
}

export const clearExerciseInfo = (): ClearExerciseInfoAction => {
  return {
    type: ActionTypes.CLEAR_EXERCISE_FORM,
  };
};
