import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, of, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map, take, tap, filter } from 'rxjs/operators';

import { User } from '../auth/user.model';
import { Workout } from './workout.model';
import { Exercise, WOExercise } from './exercise.model';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../app.reducer';
import * as WorkoutActions from './workout.actions';
import * as UIActions from './../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService implements OnDestroy {
  private fbSubs: Subscription[] = [];
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  userSub: Subscription;
  user: User = null;
  availableworkouts = [];
  userWorkouts: Workout[];
  newWorkoutID: string;
  currentWorkout: Workout;
  private _exercises: WOExercise[];
  exerciseIndex = 0;
  exerciseChanged = new BehaviorSubject<number>(0);
  availableExercises: Exercise[];
  history$ = this.store.select(fromApp.getWorkoutHistory).pipe(
    tap(history => {
      if (!history.length) {
        this.store.dispatch(new WorkoutActions.FetchWorkoutHistory());
      }
    }),
    filter(history => history !== null)
  );
  workoutHistory: Workout[];

  constructor(
    private store: Store<fromApp.State>,
    private firestore: AngularFirestore,
    private uiService: UIService,
    private router: Router
  ) {
    this.init();
  }

  init() {
    this.userSub = this.store
      .select(fromApp.getUser)
      .subscribe(user => (this.user = user));
    this.subscription = this.store
      .select(fromApp.getActiveExerciseIndex)
      .subscribe(index => (this.exerciseIndex = index));

    // TODO: remove when effects are complete
    this.subscription2 = this.store
      .select(fromApp.getAvailableExercises)
      .subscribe(exercises => {
        this.availableExercises = exercises;
      });

    this.subscription3 = this.history$.subscribe(
      history => (this.workoutHistory = history)
    );
  }

  get woexercises$(): Observable<WOExercise[]> {
    return of(this._exercises);
  }

  getCurrentExercise() {
    return this._exercises[this.exerciseIndex];
  }

  getCurrentExerciseIndex() {
    return this.exerciseIndex;
  }

  addWorkout(workout: Workout, exercises: WOExercise[]) {
    this.firestore
      .collection(`users/${this.user.uid}/workouts`)
      .add(workout)
      .then(docRef => {
        exercises.forEach(ex => {
          this.firestore
            .collection(
              `users/${this.user.uid}/workouts/${docRef.id}/exercises`
            )
            .add(ex);
        });
      });
    this.router.navigate(['workout']);
  }

  deleteWorkout(id: string) {
    return this.firestore
      .collection(`users/${this.user.uid}/workouts`)
      .doc(id)
      .delete();
  }

  deleteWorkoutFromHistory(id: string) {
    return this.firestore
      .collection(`users/${this.user.uid}/workoutHistory`)
      .doc(id)
      .delete();
  }

  private async deleteCollection(path: string) {
    const batch = this.firestore.firestore.batch();
    const qs = await this.firestore.collection(path).ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }

  startWorkout(code: number) {
    this.store.dispatch(new WorkoutActions.StartWorkout());
  }

  quitWorkout() {
    this.store.dispatch(new WorkoutActions.StopWorkout());
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
