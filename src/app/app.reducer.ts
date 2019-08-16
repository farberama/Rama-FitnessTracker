import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromWorkout from './workout/workout.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
  wo: fromWorkout.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  wo: fromWorkout.workoutReducer
};

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(
  getUIState,
  fromUI.getIsLoading
);

export const getWorkoutState = createFeatureSelector<fromWorkout.State>('wo');
export const getIsEditing = createSelector(
  getWorkoutState,
  fromWorkout.getIsEditing
);
export const getIsWorkingOut = createSelector(
  getWorkoutState,
  fromWorkout.getIsWorkingOut
);
export const getAvailableExercisesFetched = createSelector(
  getWorkoutState,
  fromWorkout.getAvailableExercisesFetched
);
export const getAvailableExercises = createSelector(
  getWorkoutState,
  fromWorkout.getAvailableExercises
);
export const getAvailableWorkouts = createSelector(
  getWorkoutState,
  fromWorkout.getAvailableWorkouts
);
export const getWorkoutHistory = createSelector(
  getWorkoutState,
  fromWorkout.getWorkoutHistory
);
export const getActiveExercise = createSelector(
  getWorkoutState,
  fromWorkout.getActiveExercise
);
export const getActiveExerciseIndex = createSelector(
  getWorkoutState,
  fromWorkout.getActiveExerciseIndex
);
export const getCurrentWorkout = createSelector(
  getWorkoutState,
  fromWorkout.getCurrentWorkout
);
export const getActiveWorkout = createSelector(
  getWorkoutState,
  fromWorkout.getActiveWorkout
);
export const getHistoryLoaded = createSelector(
  getWorkoutState,
  fromWorkout.getHistoryLoaded
);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuth
);
export const getUser = createSelector(
  getAuthState,
  fromAuth.getUser
);
