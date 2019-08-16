import * as TrainingActions from './training.actions';
import { Exercise } from './exercise.model';
import * as fromApp from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  exerciseHistory: Exercise[];
  currentExercise: Exercise;

  // TODO: to be removed when user module is complete
  currentUserWeight: number;
}

export interface State extends fromApp.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  exerciseHistory: [],
  currentExercise: null,
  // TODO: currentUserWeight to be removed when user component is complete
  currentUserWeight: null
};

export function trainingReducer(
  state = initialState,
  action: TrainingActions.TrainingActions
) {
  switch (action.type) {
    case TrainingActions.SET_USER_WEIGHT:
      return {
        ...state,
        currentUserWeight: action.payload
      };
    case TrainingActions.SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };
    case TrainingActions.SET_EXERCISE_HISTORY:
      return {
        ...state,
        exerciseHistory: action.payload
      };
    case TrainingActions.START_TRAINING:
      const currentExercise = state.availableExercises.find(
        ex => ex.code === action.payload
      );
      return {
        ...state,
        currentExercise: {
          ...currentExercise,
          // TODO: duration: +currentExercise.duration
          // TODO: to be changed back once new workout module completed
          duration: 0.5
        }
      };
    case TrainingActions.SET_TRAINING_COMPLETED:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          // METS to calorie/min conversion: METS x 3.5 x body weight in kg / 200 = cal/min.
          // cal/min * duration = total cal burned
          // lbs to kg conversion: lbs / 2.2046 = kg

          // TODO: remove lbs to kg conversion once user component complete
          calories:
            ((state.currentExercise.mets *
              3.5 *
              (state.currentUserWeight / 2.2046)) /
              200) *
            state.currentExercise.duration,
          date: new Date(),
          state: 'completed'
        }
      };
    case TrainingActions.SET_TRAINING_CANCELED:
      const duration = parseFloat(
        (state.currentExercise.duration * (action.payload / 100)).toFixed(2)
      );
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          duration: duration,
          calories:
            ((state.currentExercise.mets *
              3.5 *
              (state.currentUserWeight / 2.2046)) /
              200) *
            duration,
          date: new Date(),
          state: 'canceled'
        }
      };
    case TrainingActions.STOP_TRAINING:
      return {
        ...state,
        currentExercise: null
      };
    default:
      return state;
  }
}

// this is done for lazy loaded modules
export const getTrainingState = createFeatureSelector<TrainingState>(
  'training'
);

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getExerciseHistory = createSelector(
  getTrainingState,
  (state: TrainingState) => state.exerciseHistory
);
export const getCurrentExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.currentExercise
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.currentExercise != null
);
