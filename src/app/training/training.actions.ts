import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_USER_WEIGHT = '[Training] Set User Weight';
export const SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_EXERCISE_HISTORY = '[Training] Set Exercise History';
export const START_TRAINING = '[Training] Start Training';
export const SET_TRAINING_COMPLETED = '[Training] Set Training Completed';
export const SET_TRAINING_CANCELED = '[Training] Set Training Canceled';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetUserWeight implements Action {
  readonly type = SET_USER_WEIGHT;

  constructor(public payload: number) {}
}

export class SetAvalableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class SetExerciseHistory implements Action {
  readonly type = SET_EXERCISE_HISTORY;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: number) {}
}

export class SetTrainingCompleted implements Action {
  readonly type = SET_TRAINING_COMPLETED;
}

export class SetTrainingCanceled implements Action {
  readonly type = SET_TRAINING_CANCELED;

  constructor(public payload: number) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  | SetUserWeight
  | SetAvalableExercises
  | SetExerciseHistory
  | StartTraining
  | StopTraining
  | SetTrainingCompleted
  | SetTrainingCanceled;
