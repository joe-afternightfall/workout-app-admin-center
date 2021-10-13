import { ActionTypes } from './actions';
import { ExerciseVO, RoutineTemplateVO } from 'workout-app-common-core';
import { ExerciseTypeVO } from '../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export interface LoadExercisesAction {
  type: ActionTypes.LOAD_EXERCISES;
  exercises: ExerciseVO[];
}

export const loadExercises = (exercises: ExerciseVO[]): LoadExercisesAction => {
  return {
    type: ActionTypes.LOAD_EXERCISES,
    exercises: exercises,
  };
};

export interface LoadExerciseTypesAction {
  type: ActionTypes.LOAD_EXERCISE_TYPES;
  exerciseTypes: ExerciseTypeVO[];
}

export const loadExerciseTypes = (
  exerciseTypes: ExerciseTypeVO[]
): LoadExerciseTypesAction => {
  return {
    type: ActionTypes.LOAD_EXERCISE_TYPES,
    exerciseTypes: exerciseTypes,
  };
};

export interface LoadRoutineTemplatesAction {
  type: ActionTypes.LOAD_ROUTINE_TEMPLATES;
  routineTemplates: RoutineTemplateVO[];
}

export const loadRoutineTemplates = (
  routineTemplates: RoutineTemplateVO[]
): LoadRoutineTemplatesAction => {
  return {
    type: ActionTypes.LOAD_ROUTINE_TEMPLATES,
    routineTemplates: routineTemplates,
  };
};
