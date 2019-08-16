import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, of, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map, take, tap, filter } from 'rxjs/operators';

import { User } from '../auth/user.model';
import { Workout } from './workout.model';
import { Exercise, WOExercise } from './exercise.model';
import { AuthService } from './../auth/auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../app.reducer';
import * as WorkoutActions from './workout.actions';
import { compendium, Compendium } from './compendium2';
import * as UIActions from './../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService implements OnDestroy {
  private fbSubs: Subscription[] = [];
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  user: User = null;
  availableworkouts = [];
  userWorkouts: Workout[];
  newWorkoutID: string;
  currentWorkout: Workout;
  private _exercises: WOExercise[];
  exerciseIndex = 0;
  exerciseChanged = new BehaviorSubject<number>(0);
  availableExercises: Exercise[];
  compendium: Compendium[];
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
    private authService: AuthService,
    private router: Router
  ) {
    this.init();
  }

  init() {
    this.user = this.authService.user;
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

  fetchAvailableExercises() {
    return this.firestore
      .collection('compendium', ref => ref.orderBy('category', 'asc'))
      .valueChanges()
      .pipe(
        map((exercises: Exercise[]) => {
          console.log(exercises);
          return new WorkoutActions.SetAvailableExercises(exercises);
        })
      );
  }

  // fetchWorkouts(uid) {
  //   this.store.dispatch(new UIActions.StartLoading());
  //   this.fbSubs.push(
  //     this.firestore
  //       .collection(`users/${uid}/workouts`)
  //       .snapshotChanges()
  //       .pipe(
  //         map(actions => {
  //           return actions.map(action => {
  //             const data = action.payload.doc.data() as Workout;
  //             data.id = action.payload.doc.id;
  //             return data;
  //           });
  //         })
  //       )
  //       .subscribe(workouts => {
  //         this.store.dispatch(new WorkoutActions.SetAvalableWorkouts(workouts));
  //       })
  //   );
  // }

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

  // updateWorkout(
  //   workout: Workout,
  //   exercises: WOExercise[],
  //   deletedExercises: WOExercise[]
  // ) {
  //   // TODO: error handling
  //   this.firestore
  //     .collection(`users/${this.user.uid}/workouts`)
  //     .doc(workout.id)
  //     .set(workout, { merge: true })
  //     .then(() => {
  //       exercises.forEach(ex => {
  //         ex.duration = +ex.duration;
  //         ex.calories = +ex.calories;
  //         if (ex.id) {
  //           this.firestore
  //             .collection(
  //               `users/${this.user.uid}/workouts/${workout.id}/exercises`
  //             )
  //             .doc(ex.id)
  //             .set(ex, { merge: true });
  //         } else {
  //           const availEx = this.availableExercises.find(
  //             avex => avex.code === ex.code
  //           );
  //           ex = {
  //             ...ex,
  //             category: availEx.category,
  //             type: availEx.type,
  //             mets: availEx.mets
  //           };
  //           this.firestore
  //             .collection(
  //               `users/${this.user.uid}/workouts/${workout.id}/exercises`
  //             )
  //             .add(ex);
  //         }
  //       });
  //     })
  //     .then(() => {
  //       deletedExercises.forEach(ex => {
  //         this.firestore
  //           .collection(
  //             `users/${this.user.uid}/workouts/${workout.id}/exercises`
  //           )
  //           .doc(ex.id)
  //           .delete();
  //       });
  //     });
  //   this.router.navigate(['workout/details', workout.id]);
  // }

  deleteWorkout(id) {
    return this.deleteCollection(
      `users/${this.user.uid}/workouts/${id}/exercises`
    ).then(data => {
      this.firestore
        .collection(`users/${this.user.uid}/workouts`)
        .doc(id)
        .delete();
    });
  }

  private async deleteCollection(path: string) {
    const batch = this.firestore.firestore.batch();
    const qs = await this.firestore.collection(path).ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }

  // fetchWorkout(id: string) {
  //   this.user = this.authService.user;
  //   return this.firestore
  //     .doc(`users/${this.user.uid}/workouts/${id}`)
  //     .get()
  //     .pipe(
  //       take(1),
  //       mergeMap(workout => {
  //         this.currentWorkout = workout.data() as Workout;
  //         return this.firestore
  //           .collection(`users/${this.user.uid}/workouts/${id}/exercises`)
  //           .get()
  //           .pipe(
  //             map(exercises => {
  //               exercises.docs.forEach(ex => {
  //                 this.currentWorkout.exercises.push(ex.data() as WOExercise);
  //               });
  //               return this.currentWorkout;
  //             })
  //           );
  //       })
  //     );
  // }

  // fetchWorkoutExercises(id: string) {
  //   return this.firestore
  //     .collection(`users/${this.user.uid}/workouts/${id}/exercises`, ref =>
  //       ref.orderBy('order', 'asc')
  //     )
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => {
  //         return actions.map(action => {
  //           const data = action.payload.doc.data() as WOExercise;
  //           data.id = action.payload.doc.id;
  //           return data;
  //         });
  //       }),
  //       tap(exercises => {
  //         this.store.dispatch(
  //           new WorkoutActions.SetCurrentWorkoutExercises(exercises)
  //         );
  //       })
  //     );
  // }

  startWorkout(code: number) {
    this.store.dispatch(new WorkoutActions.StartWorkout());
  }

  completeWorkout() {
    this.store.dispatch(new WorkoutActions.SetWorkoutCompleted());
    // this.store.dispatch(new WorkoutActions.StopWorkout());
    // this.addWorkoutsToDB();
  }

  cancelWorkout(progress: number) {
    // this.store.dispatch(new WorkoutActions.SetWorkoutCanceled(progress));
    // this.store.dispatch(new WorkoutActions.SetWorkoutCanceled(progress / 100));
    // this.addWorkoutsToDB();
  }

  cancelExercise(progress: number) {
    this.store.dispatch(new WorkoutActions.UpdateActiveWorkout(progress / 100));
  }

  quitWorkout() {
    this.store.dispatch(new WorkoutActions.StopWorkout());
  }

  exerciseCompleted() {
    this.store.dispatch(new WorkoutActions.UpdateActiveWorkout(1));
  }

  private addWorkoutsToDB() {
    console.log('DB');
    this.store
      .select(fromApp.getActiveWorkout)
      .pipe(take(1))
      .subscribe(workout => {
        if (workout.date) {
          this.firestore
            .collection(`users/${this.user.uid}/workoutHistory`)
            .add(workout);
        }
      });
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  uploadCompendium() {
    this.compendium.forEach(comp => {
      comp.exercises.forEach(ex => {
        ex.code = ex.code;
        ex.mets = +ex.mets;
      });
      this.firestore.collection('compendium').add(comp);
    });
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
  }
}
