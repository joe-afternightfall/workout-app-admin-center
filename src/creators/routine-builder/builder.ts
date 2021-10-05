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

export interface AddExerciseAndSetToSegmentAction {
  type: ActionTypes.ADD_EXERCISE_AND_SET_TO_SEGMENT;
  segmentId: string;
  exerciseId: string;
}

export const addExerciseAndSetToSegment = (
  segmentId: string,
  exerciseId: string
): AddExerciseAndSetToSegmentAction => {
  return {
    type: ActionTypes.ADD_EXERCISE_AND_SET_TO_SEGMENT,
    segmentId: segmentId,
    exerciseId: exerciseId,
  };
};
