import { Action } from '@ngrx/store';
import { Exercise, WOExercise } from './exercise.model';
import { Workout } from './workout.model';

export const SET_USER_WEIGHT = '[Workout] Set User Weight';
export const SET_EDIT_MODE = '[Workout] Set Edit Mode';
export const UNSET_EDIT_MODE = '[Workout] Unset Edit Mode';
export const START_ADD_WORKOUT = '[Workout] Start Add Workout';
export const ADD_WORKOUT = '[Workout] Add Workout';
export const START_EDIT_WORKOUT = '[Workout] Start Edit Workout';
export const UPDATE_EDITED_WORKOUT = '[Workout] Update Edited Workout';
export const UPDATE_ACTIVE_WORKOUT = '[Workout] Update Active Workout';
export const FETCH_AVAILABLE_WORKOUTS = '[Workout] Fetch Available Workouts';
export const FETCH_CURRENT_WORKOUT_EXERCISES =
  '[Workout] Fetch Current Workout Exercises';
export const SET_WORKOUT_EXERCISES = '[Workout] Set Current Workout Exercises';
export const CLEAR_WORKOUT_EXERCISES =
  '[Workout] Clear Current Workout Exercises';
export const SET_AVAILABLE_WORKOUTS = '[Workout] Set Available Workouts';
export const DELETE_WORKOUT = '[Workout] Delete Workout';
export const FETCH_AVAILABLE_EXERCISES = '[Workout] Fetch Available Exercises';
export const SET_EXERCISES_FETCHED =
  '[Workout] Set Available Exercises Fetched';
export const SET_AVAILABLE_EXERCISES = '[Workout] Set Available Exercises';
export const FETCH_WORKOUT_HISTORY = '[Workout] Fetch Workout History';
export const SET_WORKOUT_HISTORY = '[Workout] Set Workout History';
export const SET_CURRENT_WORKOUT = '[Workout] Set Current Workout';
export const UNSET_CURRENT_WORKOUT = '[Workout] Unset Current Workout';
export const START_WORKOUT = '[Workout] Start Workout';
export const SET_CURRENT_EXERCISE = '[Workout] Set Current Exercise';
export const SET_EXERCISE_COMPLETE = '[Workout] Set Exercise Completed';
export const COMPLETE_WORKOUT = '[Workout] Complete Workout';
export const SET_WORKOUT_COMPLETED = '[Workout] Set Workout Completed';
export const SET_WORKOUT_CANCELED = '[Workout] Set Workout Canceled';
export const STOP_WORKOUT = '[Workout] Stop Workout';

export class SetUserWeight implements Action {
  readonly type = SET_USER_WEIGHT;

  constructor(public payload: number) {}
}

export class SetEditMode implements Action {
  readonly type = SET_EDIT_MODE;
}

export class UnsetEditMode implements Action {
  readonly type = UNSET_EDIT_MODE;
}

export class SetCurrentWorkout implements Action {
  readonly type = SET_CURRENT_WORKOUT;

  constructor(public payload: Workout) {}
}

export class UnsetCurrentWorkout implements Action {
  readonly type = UNSET_CURRENT_WORKOUT;
}

export class UpsertWorkout implements Action {
  readonly type = START_ADD_WORKOUT;

  constructor(public payload: { workout: Workout }) {}
}

export class StartEditWorkout implements Action {
  readonly type = START_EDIT_WORKOUT;

  constructor(
    public payload: {
      workout: Workout;
      exercises: WOExercise[];
      deletedExercises: WOExercise[];
    }
  ) {}
}

export class DeleteWorkout implements Action {
  readonly type = DELETE_WORKOUT;

  constructor(public payload: string) {}
}

export class SetAvailableExercisesFetched implements Action {
  readonly type = SET_EXERCISES_FETCHED;
}

export class SetAvailableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class FetchAvailableExercises implements Action {
  readonly type = FETCH_AVAILABLE_EXERCISES;
}

export class SetAvailableWorkouts implements Action {
  readonly type = SET_AVAILABLE_WORKOUTS;

  constructor(public payload: Workout[]) {}
}

export class FetchAvailableWorkouts implements Action {
  readonly type = FETCH_AVAILABLE_WORKOUTS;

  constructor(public payload: string) {}
}

export class FetchCurrentWorkoutExercises implements Action {
  readonly type = FETCH_CURRENT_WORKOUT_EXERCISES;

  constructor(public payload: { uid: string; woid: string }) {}
}

export class FetchWorkoutHistory implements Action {
  readonly type = FETCH_WORKOUT_HISTORY;
}

export class SetWorkoutHistory implements Action {
  readonly type = SET_WORKOUT_HISTORY;

  constructor(public payload: Workout[]) {}
}

export class StartWorkout implements Action {
  readonly type = START_WORKOUT;
}

export class UpdateActiveWorkout implements Action {
  readonly type = UPDATE_ACTIVE_WORKOUT;

  constructor(public payload: number) {}
}

export class SetCurrentExercise implements Action {
  readonly type = SET_CURRENT_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class SetExerciseCompleted implements Action {
  readonly type = SET_EXERCISE_COMPLETE;
}

export class SetWorkoutCompleted implements Action {
  readonly type = SET_WORKOUT_COMPLETED;
}

export class SetWorkoutCanceled implements Action {
  readonly type = SET_WORKOUT_CANCELED;

  constructor(public payload: number) {}
}

export class CompleteWorkout implements Action {
  readonly type = COMPLETE_WORKOUT;
}

export class StopWorkout implements Action {
  readonly type = STOP_WORKOUT;
}

export type WorkoutActions =
  | SetUserWeight
  | SetEditMode
  | UnsetEditMode
  | SetCurrentWorkout
  | UnsetCurrentWorkout
  | UpsertWorkout
  | StartEditWorkout
  | DeleteWorkout
  | SetAvailableExercisesFetched
  | SetAvailableExercises
  | FetchAvailableExercises
  | FetchAvailableWorkouts
  | SetAvailableWorkouts
  | FetchWorkoutHistory
  | SetWorkoutHistory
  | StartWorkout
  | UpdateActiveWorkout
  | FetchCurrentWorkoutExercises
  | SetCurrentExercise
  | CompleteWorkout
  | SetExerciseCompleted
  | StopWorkout
  | SetWorkoutCompleted
  | SetWorkoutCanceled;
