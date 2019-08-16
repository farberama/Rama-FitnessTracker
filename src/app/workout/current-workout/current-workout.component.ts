import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { WOExercise } from './../exercise.model';
import { Workout } from './../workout.model';
import * as fromApp from './../../app.reducer';

@Component({
  selector: 'app-current-workout',
  templateUrl: './current-workout.component.html',
  styleUrls: ['./current-workout.component.css']
})
export class CurrentWorkoutComponent implements OnInit {
  subscription: Subscription;
  currentExerciseIndex: number;
  length: number;
  exerciseIndex: number;
  workoutMode$: Observable<boolean>;
  activeWorkout$: Observable<Workout>;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.activeWorkout$ = this.store.select(fromApp.getActiveWorkout);
    this.workoutMode$ = this.store.select(fromApp.getIsWorkingOut);
    this.subscription = this.store
      .select(fromApp.getActiveExerciseIndex)
      .subscribe(index => {
        this.currentExerciseIndex = index;
      });
  }
}
