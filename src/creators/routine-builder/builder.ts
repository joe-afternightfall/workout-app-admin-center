import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from '../actions';
import { RoutineTemplateVO } from 'workout-app-common-core';

export interface BuildNewRoutineAction {
  type: ActionTypes.BUILD_NEW_ROUTINE;
  routine: RoutineTemplateVO;
}

export const buildNewRoutine = (): BuildNewRoutineAction => {
  return {
    type: ActionTypes.BUILD_NEW_ROUTINE,
    routine: {
      id: uuidv4(),
      firebaseId: '',
      name: '',
      workoutCategoryId: '',
      phases: [],
    },
  };
};

export interface UpdateRoutineTitleAction {
  type: ActionTypes.UPDATE_ROUTINE_TITLE;
  value: string;
}

export const updateRoutineTitle = (value: string): UpdateRoutineTitleAction => {
  return {
    type: ActionTypes.UPDATE_ROUTINE_TITLE,
    value: value,
  };
};

export interface UpdateSelectedCategoryIdAction {
  type: ActionTypes.UPDATE_SELECTED_CATEGORY_ID;
  id: string;
}

export const updateSelectedCategoryId = (
  id: string
): UpdateSelectedCategoryIdAction => {
  return {
    type: ActionTypes.UPDATE_SELECTED_CATEGORY_ID,
    id: id,
  };
};

export interface AddPhaseToRoutineAction {
  type: ActionTypes.ADD_PHASE_TO_ROUTINE;
}

export const addPhaseToRoutine = (): AddPhaseToRoutineAction => {
  return {
    type: ActionTypes.ADD_PHASE_TO_ROUTINE,
  };
};

export interface SelectPhaseAction {
  type: ActionTypes.SELECT_PHASE;
  workoutPhaseId: string;
  phaseId: string;
}

export const selectPhase = (
  workoutPhaseId: string,
  phaseId: string
): SelectPhaseAction => {
  return {
    type: ActionTypes.SELECT_PHASE,
    workoutPhaseId: workoutPhaseId,
    phaseId: phaseId,
  };
};

export interface SelectSetTypeAction {
  type: ActionTypes.SELECT_SET_TYPE;
  segmentId: string;
  setTypeId: string;
}

export const selectSetType = (
  segmentId: string,
  setTypeId: string
): SelectSetTypeAction => {
  return {
    type: ActionTypes.SELECT_SET_TYPE,
    segmentId: segmentId,
    setTypeId: setTypeId,
  };
};

export interface AddSegmentToPhaseAction {
  type: ActionTypes.ADD_SEGMENT_TO_PHASE;
  id: string;
}

export const addSegmentToPhase = (id: string): AddSegmentToPhaseAction => {
  return {
    type: ActionTypes.ADD_SEGMENT_TO_PHASE,
    id: id,
  };
};

export interface UpdateRestBetweenAction {
  type: ActionTypes.UPDATE_REST_BETWEEN;
  restType: 'set' | 'segment';
  segmentId: string;
  option: number;
}

export const updateRestBetween = (
  restType: 'set' | 'segment',
  segmentId: string,
  option: string
): UpdateRestBetweenAction => {
  return {
    type: ActionTypes.UPDATE_REST_BETWEEN,
    restType: restType,
    segmentId: segmentId,
    option: Number(option),
  };
};

export interface SelectedExerciseSlotToFillAction {
  type: ActionTypes.SELECTED_EXERCISE_SLOT_TO_FILL;
  segmentId: string;
  order: number;
}

export const selectedExerciseSlotToFill = (
  segmentId: string,
  order: number
): SelectedExerciseSlotToFillAction => {
  return {
    type: ActionTypes.SELECTED_EXERCISE_SLOT_TO_FILL,
    segmentId: segmentId,
    order: order,
  };
};

export interface AddExerciseToSegmentAction {
  type: ActionTypes.ADD_EXERCISE_TO_SEGMENT;
  exerciseId: string;
}

export const addExerciseToSegment = (
  exerciseId: string
): AddExerciseToSegmentAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_TO_SEGMENT,
    exerciseId: exerciseId,
  };
};

export interface DeleteExerciseFromSegmentAction {
  type: ActionTypes.DELETE_EXERCISE_FROM_SEGMENT;
  segmentId: string;
  exerciseId: string;
}

export const deleteExerciseFromSegment = (
  segmentId: string,
  exerciseId: string
): DeleteExerciseFromSegmentAction => {
  return {
    type: ActionTypes.DELETE_EXERCISE_FROM_SEGMENT,
    segmentId: segmentId,
    exerciseId: exerciseId,
  };
};

export interface ResetSetTypeAndExerciseInfoAction {
  type: ActionTypes.RESET_SET_TYPE_AND_EXERCISE_INFO;
  segmentId: string;
}

export const resetSetTypeAndExerciseInfo = (
  segmentId: string
): ResetSetTypeAndExerciseInfoAction => {
  return {
    type: ActionTypes.RESET_SET_TYPE_AND_EXERCISE_INFO,
    segmentId: segmentId,
  };
};

export interface AddSetToEachExerciseInSegmentAction {
  type: ActionTypes.ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT;
  segmentId: string;
}

export const addSetToEachExerciseInSegment = (
  segmentId: string
): AddSetToEachExerciseInSegmentAction => {
  return {
    type: ActionTypes.ADD_SET_TO_EACH_EXERCISE_IN_SEGMENT,
    segmentId: segmentId,
  };
};

export interface DeleteSetFromEachExerciseInSegmentAction {
  type: ActionTypes.DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT;
  segmentId: string;
}

export const deleteSetFromEachExerciseInSegment = (
  segmentId: string
): DeleteSetFromEachExerciseInSegmentAction => {
  return {
    type: ActionTypes.DELETE_SET_FROM_EACH_EXERCISE_IN_SEGMENT,
    segmentId: segmentId,
  };
};

export interface DeleteSegmentFromPhaseAction {
  type: ActionTypes.DELETE_SEGMENT_FROM_PHASE;
  segmentId: string;
}

export const deleteSegmentFromPhase = (
  segmentId: string
): DeleteSegmentFromPhaseAction => {
  return {
    type: ActionTypes.DELETE_SEGMENT_FROM_PHASE,
    segmentId: segmentId,
  };
};
