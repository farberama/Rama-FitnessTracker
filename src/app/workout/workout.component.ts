import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as WorkoutActions from './workout.actions';
import * as fromApp from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  availExSub: Subscription;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.store.select(fromApp.getAvailableExercises).pipe(
      map(exercises => {
        console.log(exercises.length);
        if (exercises.length === 0) {
          this.store.dispatch(new WorkoutActions.FetchAvailableExercises());
        }
      })
    );
  }
}
