import { ActionTypes } from '../actions';
import {
  ExerciseVO,
  MuscleInfo,
  ParameterTypeVO,
} from 'workout-app-common-core';

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

export interface SelectExerciseParamTypeAction {
  type: ActionTypes.SELECT_EXERCISE_PARAM_TYPE;
  paramType: ParameterTypeVO;
}

export const selectExerciseParamType = (
  paramType: ParameterTypeVO
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

export interface AddInfoParagraphAction {
  type: ActionTypes.ADD_INFO_PARAGRAPH;
}

export const addInfoParagraph = (): AddInfoParagraphAction => {
  return {
    type: ActionTypes.ADD_INFO_PARAGRAPH,
  };
};

export interface RemoveInfoAction {
  type: ActionTypes.REMOVE_INFO;
  id: string;
}

export const removeInfo = (id: string): RemoveInfoAction => {
  return {
    type: ActionTypes.REMOVE_INFO,
    id: id,
  };
};

export interface UpdateInfoAction {
  type: ActionTypes.UPDATE_INFO;
  infoId: string;
  field: 'title' | 'paragraph';
  value: string;
}

export const updateInfoParagraph = (
  infoId: string,
  field: 'title' | 'paragraph',
  value: string
): UpdateInfoAction => {
  return {
    type: ActionTypes.UPDATE_INFO,
    infoId: infoId,
    field: field,
    value: value,
  };
};

export interface UpdateExerciseDescriptionAction {
  type: ActionTypes.UPDATE_EXERCISE_DESCRIPTION;
  value: string;
}

export const updateExerciseDescription = (
  value: string
): UpdateExerciseDescriptionAction => {
  return {
    type: ActionTypes.UPDATE_EXERCISE_DESCRIPTION,
    value: value,
  };
};

export interface UpdateExerciseIconIdAction {
  type: ActionTypes.UPDATE_EXERCISE_ICON_ID;
  value: string;
}

export const updateExerciseIconId = (
  value: string
): UpdateExerciseIconIdAction => {
  return {
    type: ActionTypes.UPDATE_EXERCISE_ICON_ID,
    value: value,
  };
};

export interface UpdateExerciseEquipmentListIdsAction {
  type: ActionTypes.UPDATE_EXERCISE_EQUIPMENT_LIST_IDS;
  value: string[];
}

export const updateExerciseEquipmentListIds = (
  value: string[]
): UpdateExerciseEquipmentListIdsAction => {
  return {
    type: ActionTypes.UPDATE_EXERCISE_EQUIPMENT_LIST_IDS,
    value: value,
  };
};

export interface UpdateExerciseManikinMuscleGroupIdsAction {
  type: ActionTypes.UPDATE_EXERCISE_MANIKIN_MUSCLE_GROUP_IDS;
  value: string[];
}

export const updateExerciseManikinMuscleGroupIds = (
  value: string[]
): UpdateExerciseManikinMuscleGroupIdsAction => {
  return {
    type: ActionTypes.UPDATE_EXERCISE_MANIKIN_MUSCLE_GROUP_IDS,
    value: value,
  };
};

export interface AddPrimaryMuscleTargetAction {
  type: ActionTypes.ADD_PRIMARY_MUSCLE_TARGET;
}

export const addPrimaryMuscleTarget = (): AddPrimaryMuscleTargetAction => {
  return {
    type: ActionTypes.ADD_PRIMARY_MUSCLE_TARGET,
  };
};

export interface DeletePrimaryMuscleTargetAction {
  type: ActionTypes.DELETE_PRIMARY_MUSCLE_TARGET;
  primaryMuscle: MuscleInfo;
}

export const deletePrimaryMuscleTarget = (
  primaryMuscle: MuscleInfo
): DeletePrimaryMuscleTargetAction => {
  return {
    type: ActionTypes.DELETE_PRIMARY_MUSCLE_TARGET,
    primaryMuscle: primaryMuscle,
  };
};

export interface SelectPrimaryMuscleAction {
  type: ActionTypes.SELECT_PRIMARY_MUSCLE;
  primaryId: string;
  value: string;
}

export const selectPrimaryMuscle = (
  primaryId: string,
  value: string
): SelectPrimaryMuscleAction => {
  return {
    type: ActionTypes.SELECT_PRIMARY_MUSCLE,
    primaryId: primaryId,
    value: value,
  };
};

export interface SelectSecondaryMuscleAction {
  type: ActionTypes.SELECT_SECONDARY_MUSCLE;
  secondaryId: string;
  value: string;
}

export const selectSecondaryMuscle = (
  secondaryId: string,
  value: string
): SelectSecondaryMuscleAction => {
  return {
    type: ActionTypes.SELECT_SECONDARY_MUSCLE,
    secondaryId: secondaryId,
    value: value,
  };
};

export interface AddSecondaryMuscleTargetAction {
  type: ActionTypes.ADD_SECONDARY_MUSCLE_TARGET;
}

export const addSecondaryMuscleTarget = (): AddSecondaryMuscleTargetAction => {
  return {
    type: ActionTypes.ADD_SECONDARY_MUSCLE_TARGET,
  };
};

export interface DeleteSecondaryMuscleTargetAction {
  type: ActionTypes.DELETE_SECONDARY_MUSCLE_TARGET;
  secondaryMuscle: MuscleInfo;
}

export const deleteSecondaryMuscleTarget = (
  secondaryMuscle: MuscleInfo
): DeleteSecondaryMuscleTargetAction => {
  return {
    type: ActionTypes.DELETE_SECONDARY_MUSCLE_TARGET,
    secondaryMuscle: secondaryMuscle,
  };
};

export interface SelectSecondaryTargetTypeAction {
  type: ActionTypes.SELECT_SECONDARY_TARGET_TYPE;
  secondaryId: string;
  value: string;
}

export const selectSecondaryTargetType = (
  secondaryId: string,
  value: string
): SelectSecondaryTargetTypeAction => {
  return {
    type: ActionTypes.SELECT_SECONDARY_TARGET_TYPE,
    secondaryId: secondaryId,
    value: value,
  };
};

export interface UpdateFilesToUploadAction {
  type: ActionTypes.UPDATE_FILES_TO_UPLOAD;
  files: File[];
}

export const updateFilesToUpload = (
  files: File[]
): UpdateFilesToUploadAction => {
  return {
    type: ActionTypes.UPDATE_FILES_TO_UPLOAD,
    files: files,
  };
};
