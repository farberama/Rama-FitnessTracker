import { AuthService } from './../auth/auth.service';
import { UIService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { Workout } from './workout.model';
import * as WorkoutActions from '../workout/workout.actions';
import * as fromApp from '../app.reducer';

const calculateCalories = (mets: number, duration: number, weight: number) =>
  ((mets * 3.5 * weight) / 200) * duration;

function sortExercises(a, b) {
  const exA = a.order;
  const exB = b.order;

  let comparison = 0;
  if (exA > exB) {
    comparison = 1;
  } else if (exA < exB) {
    comparison = -1;
  }
  return comparison;
}

@Injectable()
export class WorkoutEffects {
  user = this.authService.user;
  availableExercises: Exercise[];

  @Effect()
  completeWorkout = this.actions$.pipe(
    ofType(WorkoutActions.COMPLETE_WORKOUT),
    switchMap(() => {
      return this.store.select(fromApp.getActiveWorkout).pipe(take(1));
    }),
    map(workout => {
      console.log('uploading date: ', workout.date);
      this.firestore
        .collection(`users/${this.user.uid}/workoutHistory`)
        .add(workout);
      return workout;
    }),
    map(() => {
      console.log('stopping at: ');
      return new WorkoutActions.StopWorkout();
    })
  );

  @Effect()
  fetchAvailableExercises = this.actions$.pipe(
    ofType(WorkoutActions.FETCH_AVAILABLE_EXERCISES),
    switchMap(() => {
      console.log('switchmap');
      return this.firestore
        .collection('compendium2', ref => ref.orderBy('code', 'asc'))
        .valueChanges();
    }),
    map((exercises: Exercise[]) => {
      console.log(exercises);
      return new WorkoutActions.SetAvailableExercises(exercises);
    })
  );
  // .pipe(

  // TODO: fix error handling

  // catchError(err => {
  //   this.store.dispatch(new UIActions.StopLoading());
  //   this.uiService.showSnackBar(
  //     'Could not retrieve exercises. Try again later. ' + err,
  //     'close',
  //     3000
  //   );
  //   return throwError(err);
  // })

  // TODO: error handling
  @Effect()
  fetchWorkoutHistory = this.actions$.pipe(
    ofType(WorkoutActions.FETCH_WORKOUT_HISTORY),
    switchMap(() => {
      return this.firestore
        .collection(`users/${this.user.uid}/workoutHistory`, ref =>
          ref.orderBy('date', 'desc')
        )
        .valueChanges();
    }),
    map((workouts: Workout[]) => {
      workouts.forEach(wo => {
        wo.exercises.sort(sortExercises);
      });
      console.log(workouts);
      return new WorkoutActions.SetWorkoutHistory(workouts);
    })
  );

  // TODO: error handling
  @Effect()
  fetchAvailableWorkouts = this.actions$.pipe(
    ofType(WorkoutActions.FETCH_AVAILABLE_WORKOUTS),
    switchMap((fetchData: WorkoutActions.FetchAvailableWorkouts) => {
      console.log('switchmap');
      return this.firestore
        .collection(`users/${fetchData.payload}/workouts`)
        .snapshotChanges();
    }),
    map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Workout;
        data.id = action.payload.doc.id;
        return data;
      });
    }),
    map((workouts: Workout[]) => {
      workouts.forEach(wo => {
        wo.exercises.sort(sortExercises);
      });
      console.log(workouts);
      return new WorkoutActions.SetAvailableWorkouts(workouts);
    })
  );

  // TODO: error handling
  @Effect({ dispatch: false })
  upsertWorkout = this.actions$.pipe(
    ofType(WorkoutActions.START_ADD_WORKOUT),
    switchMap(action => {
      console.log(action.payload.workout);
      if (!action.payload.workout.id) {
        return this.firestore
          .collection(`users/${this.user.uid}/workouts/`)
          .add(action.payload.workout);
      } else {
        return this.firestore
          .collection(`users/${this.user.uid}/workouts`)
          .doc(action.payload.workout.id)
          .update({
            name: action.payload.workout.name,
            totalDuration: action.payload.workout.totalDuration,
            totalCalories: action.payload.workout.totalCalories,
            exercises: action.payload.workout.exercises
          });
      }
    })
  );

  constructor(
    private actions$: Actions<WorkoutActions.WorkoutActions>,
    private firestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromApp.State>,
    private authService: AuthService
  ) {}
}
