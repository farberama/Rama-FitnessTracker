import { Workout } from './workout.model';
import { Exercise } from './exercise.model';
import * as WorkoutActions from './workout.actions';

export interface State {
  availableExercises: Exercise[];
  availableExercisesFetched: boolean;
  availableWorkouts: Workout[];
  workoutHistory: Workout[];
  historyLoaded: boolean;
  currentWorkout: Workout;
  currentUserWeight: number;
  activeWorkout: Workout;
  activeExerciseIndex: number;
  workoutMode: boolean;
  editMode: boolean;
  currentExIndex: number;
}

const initialState: State = {
  availableExercises: [],
  availableExercisesFetched: false,
  availableWorkouts: [],
  workoutHistory: [],
  historyLoaded: false,
  currentWorkout: null,
  currentUserWeight: null,
  activeWorkout: null,
  activeExerciseIndex: 0,
  workoutMode: false,
  editMode: false,
  currentExIndex: 0
};

export function workoutReducer(
  state = initialState,
  action: WorkoutActions.WorkoutActions
) {
  switch (action.type) {
    case WorkoutActions.SET_USER_WEIGHT:
      return {
        ...state,
        currentUserWeight: action.payload
      };
    case WorkoutActions.SET_EDIT_MODE:
      return {
        ...state,
        editMode: true
      };
    case WorkoutActions.UNSET_EDIT_MODE:
      return {
        ...state,
        editMode: false
      };
    case WorkoutActions.SET_CURRENT_WORKOUT:
      return {
        ...state,
        currentWorkout: { ...action.payload }
      };
    case WorkoutActions.UNSET_CURRENT_WORKOUT:
      return {
        ...state,
        currentWorkout: null
      };
    case WorkoutActions.SET_EXERCISES_FETCHED:
      return {
        ...state,
        availableExercisesFetced: true
      };
    case WorkoutActions.SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: [...action.payload]
      };
    case WorkoutActions.SET_AVAILABLE_WORKOUTS:
      return {
        ...state,
        availableWorkouts: [...action.payload]
      };
    case WorkoutActions.DELETE_WORKOUT:
      return {
        ...state,
        availableWorkouts: [
          ...state.availableWorkouts.filter(wo => wo.id !== action.payload)
        ]
      };
    case WorkoutActions.SET_WORKOUT_HISTORY:
      return {
        ...state,
        workoutHistory: action.payload,
        historyLoaded: true
      };
    case WorkoutActions.START_WORKOUT:
      const activeWorkout = {
        ...state.currentWorkout,
        totalDuration: 0,
        totalCalories: 0
      };
      return {
        ...state,
        activeWorkout: activeWorkout,
        activeExerciseIndex: 0,
        workoutMode: true
      };
    case WorkoutActions.UPDATE_ACTIVE_WORKOUT:
      let index = state.activeExerciseIndex;
      let activeExercises = [...state.activeWorkout.exercises];
      // calculate duration and calories of most recent active exercise
      activeExercises[index].duration = +(
        activeExercises[index].duration * action.payload
      ).toFixed(2);
      activeExercises[index].calories = +(
        ((activeExercises[index].mets * 3.5 * state.currentUserWeight) / 200) *
        activeExercises[index].duration
      ).toFixed(2);
      index++;
      return {
        ...state,
        activeWorkout: {
          ...state.activeWorkout,
          totalDuration:
            state.activeWorkout.totalDuration +
            activeExercises[index - 1].duration,
          totalCalories:
            state.activeWorkout.totalCalories +
            activeExercises[index - 1].calories,
          exercises: activeExercises
        },
        activeExerciseIndex: index
      };
    case WorkoutActions.SET_WORKOUT_COMPLETED:
      let workoutState = null;
      if (
        state.activeWorkout.totalDuration === state.currentWorkout.totalDuration
      ) {
        workoutState = 'completed';
      } else {
        workoutState = 'canceled';
      }
      return {
        ...state,
        activeWorkout: {
          ...state.activeWorkout,
          date: new Date(),
          state: workoutState
        }
      };
    case WorkoutActions.SET_WORKOUT_CANCELED:
      index = state.activeExerciseIndex;
      activeExercises = [...state.activeWorkout.exercises];

      while (index < state.activeWorkout.exercises.length) {
        activeExercises[index].duration = 0;
        activeExercises[index].calories = 0;
        index++;
      }

      return {
        ...state,
        activeWorkout: {
          ...state.activeWorkout,
          exercises: activeExercises
        },
        activeExerciseIndex: index
      };
    case WorkoutActions.STOP_WORKOUT:
      return {
        ...state,
        workoutMode: false
      };
    default:
      return state;
  }
}

export const getAvailableExercisesFetched = (state: State) =>
  state.availableExercisesFetched;
export const getAvailableExercises = (state: State) => state.availableExercises;
export const getWorkoutHistory = (state: State) => state.workoutHistory;
export const getHistoryLoaded = (state: State) => state.historyLoaded;
export const getCurrentWorkout = (state: State) => state.currentWorkout;
export const getActiveWorkout = (state: State) => state.activeWorkout;
export const getActiveExercise = (state: State) =>
  state.activeWorkout.exercises[state.activeExerciseIndex];
export const getActiveExerciseIndex = (state: State) =>
  state.activeExerciseIndex;
export const getIsWorkingOut = (state: State) => state.workoutMode;
export const getIsEditing = (state: State) => state.editMode;
export const getAvailableWorkouts = (state: State) => state.availableWorkouts;
