import { WorkoutService } from './../../workout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Workout } from '../../workout.model';
import { WOExercise } from '../../exercise.model';
import * as fromApp from '../../../app.reducer';
import * as WorkoutActions from './../../workout.actions';
import { switchMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  rtsubscription: Subscription;
  historySub: Subscription;
  workout: Workout;
  workoutHistory: Workout[];
  user: User;
  editMode: boolean;

  constructor(
    private store: Store<fromApp.State>,
    private authService: AuthService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.workoutHistory = this.workoutService.workoutHistory;
    this.user = this.authService.user;
    this.rtsubscription = this.route.params.subscribe((params: Params) => {
      this.editMode = params.id != null;
    });

    this.subscription = this.store
      .select(fromApp.getCurrentWorkout)
      .subscribe(workout => {
        this.workout = workout;
        const woHist = this.workoutHistory.find(wo => wo.id === workout.id);
        const date: any = woHist.date;
        this.workout.date = new Date(date.seconds * 1000);
        this.workout.state = woHist.state;
      });
  }

  onStartWorkout() {
    this.store.dispatch(new WorkoutActions.StartWorkout());
    this.router.navigate(['/workouts', this.workout.id]);
  }

  onStartEdit() {
    this.store.dispatch(new WorkoutActions.SetEditMode());
    this.router.navigate(['/workouts/edit', this.workout.id]);
  }

  ngOnDestroy() {
    this.rtsubscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
