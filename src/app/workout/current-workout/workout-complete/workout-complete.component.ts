import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { WOExercise } from './../../exercise.model';
import { Workout } from './../../workout.model';
import * as fromApp from './../../../app.reducer';
import * as WorkoutActions from './../../workout.actions';

@Component({
  selector: 'app-workout-complete',
  templateUrl: './workout-complete.component.html',
  styleUrls: ['./workout-complete.component.css']
})
export class WorkoutCompleteComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  workout: Workout;
  woexercises: WOExercise[];
  workoutMode$: Observable<boolean>;
  activeWorkout: Workout;

  constructor(
    private store: Store<fromApp.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription2 = this.store
      .select(fromApp.getActiveWorkout)
      .subscribe(workout => (this.activeWorkout = workout));
    this.workoutMode$ = this.store.select(fromApp.getIsWorkingOut);
    this.subscription = this.store
      .select(fromApp.getCurrentWorkout)
      .subscribe(workout => {
        this.workout = workout;
        console.log(workout.exercises);
        this.woexercises = workout.exercises;
      });
  }

  setStateStyle() {
    if (this.activeWorkout.state === 'completed') {
      return {
        'font-weight': 'bold',
        color: 'rgb(20, 194, 14)'
      };
    }

    return {
      'font-weight': 'bold',
      color: 'red'
    };
  }

  restartExercise() {
    this.store.dispatch(new WorkoutActions.SetEditMode());
    this.router.navigate(['/workouts', this.workout.id]);
  }

  backToWorkoutList() {
    this.store.dispatch(new WorkoutActions.UnsetCurrentWorkout());
    this.router.navigate(['/workouts/my-workouts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
