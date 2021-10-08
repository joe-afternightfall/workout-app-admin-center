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

export interface SetActiveCardAction {
  type: ActionTypes.SELECT_ACTIVE_CARD;
  activeCardId: string;
}

export const setActiveCard = (id: string): SetActiveCardAction => {
  return {
    type: ActionTypes.SELECT_ACTIVE_CARD,
    activeCardId: id,
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

export interface UpdateSegmentExerciseAction {
  type: ActionTypes.UPDATE_SEGMENT_EXERCISE;
  segmentId: string;
  exerciseId: string;
}

export const updateSegmentExercise = (
  segmentId: string,
  exerciseId: string
): UpdateSegmentExerciseAction => {
  return {
    type: ActionTypes.UPDATE_SEGMENT_EXERCISE,
    segmentId: segmentId,
    exerciseId: exerciseId,
  };
};

export interface AddSetToExerciseAction {
  type: ActionTypes.ADD_SET_TO_EXERCISE;
  id: string;
}

export const addSetToExercise = (id: string): AddSetToExerciseAction => {
  return {
    type: ActionTypes.ADD_SET_TO_EXERCISE,
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

export interface SelectExerciseForSegmentAction {
  type: ActionTypes.SELECT_EXERCISE_FOR_SEGMENT;
  segmentId: string;
  order: number;
}

export const selectExerciseForSegment = (
  segmentId: string,
  order: number
): SelectExerciseForSegmentAction => {
  return {
    type: ActionTypes.SELECT_EXERCISE_FOR_SEGMENT,
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

export interface DeleteSetTypeAndExerciseInfoAction {
  type: ActionTypes.DELETE_SET_TYPE_AND_EXERCISE_INFO;
  segmentId: string;
}
export const deleteSetTypeAndExerciseInfo = (
  segmentId: string
): DeleteSetTypeAndExerciseInfoAction => {
  return {
    type: ActionTypes.DELETE_SET_TYPE_AND_EXERCISE_INFO,
    segmentId: segmentId,
  };
};
