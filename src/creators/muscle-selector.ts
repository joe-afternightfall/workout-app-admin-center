import { ActionTypes } from './actions';

export interface ToggleMuscleGroupAction {
  type: ActionTypes.TOGGLE_MUSCLE_GROUP;
  muscleGroupId: string;
}

export const toggleMuscleGroup = (
  muscleGroupId: string
): ToggleMuscleGroupAction => {
  return {
    type: ActionTypes.TOGGLE_MUSCLE_GROUP,
    muscleGroupId: muscleGroupId,
  };
};

export interface ApplyHoverStylesToMuscleGroupAction {
  type: ActionTypes.APPLY_HOVER_STYLES_TO_MUSCLE_GROUP;
  groupId: string;
}
export const applyHoverStylesToMuscleGroup = (
  groupId: string
): ApplyHoverStylesToMuscleGroupAction => {
  return {
    type: ActionTypes.APPLY_HOVER_STYLES_TO_MUSCLE_GROUP,
    groupId: groupId,
  };
};

export interface ClearHoverStylesForMuscleGroupAction {
  type: ActionTypes.CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP;
}

export const clearHoverStylesForMuscleGroup =
  (): ClearHoverStylesForMuscleGroupAction => {
    return {
      type: ActionTypes.CLEAR_HOVER_STYLES_FOR_MUSCLE_GROUP,
    };
  };
