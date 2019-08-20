import { WorkoutService } from './../../workout.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Workout } from '../../workout.model';
import * as fromApp from '../../../app.reducer';
import * as WorkoutActions from './../../workout.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit, OnDestroy {
  @Input() workoutId: string;
  workout: Workout;
  subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>,
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromApp.getAvailableWorkouts)
      .subscribe(workouts => {
        const index = workouts.findIndex(wo => wo.id === this.workoutId);
        this.workout = workouts[index];
      });
  }

  onClick() {
    // this.store.dispatch(new WorkoutActions.ClearCurrentWorkoutExercises());
    this.store.dispatch(new WorkoutActions.SetCurrentWorkout(this.workout));

    this.router.navigate(['../details', this.workout.id], {
      relativeTo: this.route
    });
  }

  onDelete() {
    console.log(this.workoutService.deleteWorkout(this.workout.id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
