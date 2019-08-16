import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Workout } from '../workout.model';
import * as fromApp from '../../app.reducer';
import * as WorkoutActions from './../workout.actions';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  user: User;
  isLoading$: Observable<boolean>;
  workouts$: Observable<Workout[]>;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.store.dispatch(
      new WorkoutActions.FetchAvailableWorkouts(this.user.uid)
    );
    this.workouts$ = this.store.select(fromApp.getAvailableWorkouts);
  }
}
