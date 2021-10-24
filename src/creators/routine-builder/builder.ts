import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from '../actions';
import { Phase, RoutineTemplateVO, Segment } from 'workout-app-common-core';

export interface ViewSelectedRoutineAction {
  type: ActionTypes.VIEW_SELECTED_ROUTINE;
  routine: RoutineTemplateVO;
}

export const viewSelectedRoutine = (
  routine: RoutineTemplateVO
): ViewSelectedRoutineAction => {
  return {
    type: ActionTypes.VIEW_SELECTED_ROUTINE,
    routine: routine,
  };
};

export interface ClearRoutineBuilderAction {
  type: ActionTypes.CLEAR_ROUTINE_BUILDER;
}

export const clearRoutineBuilder = (): ClearRoutineBuilderAction => {
  return {
    type: ActionTypes.CLEAR_ROUTINE_BUILDER,
  };
};

export interface BuildNewRoutineAction {
  type: ActionTypes.BUILD_NEW_ROUTINE;
  newRoutine: boolean;
  routine: RoutineTemplateVO;
}

export const buildNewRoutine = (): BuildNewRoutineAction => {
  return {
    type: ActionTypes.BUILD_NEW_ROUTINE,
    newRoutine: true,
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

export interface ReorderRoutinePhasesAction {
  type: ActionTypes.REORDER_ROUTINE_PHASES;
  phases: Phase[];
}

export const reorderRoutinePhases = (
  phases: Phase[]
): ReorderRoutinePhasesAction => {
  return {
    type: ActionTypes.REORDER_ROUTINE_PHASES,
    phases: phases,
  };
};

export interface DeletePhaseFromRoutineAction {
  type: ActionTypes.DELETE_PHASE_FROM_ROUTINE;
  phaseId: string;
}

export const deletePhaseFromRoutine = (
  phaseId: string
): DeletePhaseFromRoutineAction => {
  return {
    type: ActionTypes.DELETE_PHASE_FROM_ROUTINE,
    phaseId: phaseId,
  };
};

export interface ReorderRoutineSegmentsAction {
  type: ActionTypes.REORDER_ROUTINE_SEGMENTS;
  phaseId: string;
  segments: Segment[];
}

export const reorderRoutineSegments = (
  phaseId: string,
  segments: Segment[]
): ReorderRoutineSegmentsAction => {
  return {
    type: ActionTypes.REORDER_ROUTINE_SEGMENTS,
    phaseId: phaseId,
    segments: segments,
  };
};

export interface FilterExercisesForSearchValueAction {
  type: ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE;
  searchValue: string;
}

export const filterExercisesForSearchValue = (
  searchValue: string
): FilterExercisesForSearchValueAction => {
  return {
    type: ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE,
    searchValue: searchValue,
  };
};

export interface AddTimerToWorkoutExerciseAction {
  type: ActionTypes.ADD_TIMER_TO_WORKOUT_EXERCISE;
  workoutExerciseId: string;
}

export const addTimerToWorkoutExercise = (
  id: string
): AddTimerToWorkoutExerciseAction => {
  return {
    type: ActionTypes.ADD_TIMER_TO_WORKOUT_EXERCISE,
    workoutExerciseId: id,
  };
};
