import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as WorkoutActions from './workout.actions';
import * as fromApp from '../app.reducer';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.store.select(fromApp.getAvailableExercises).pipe(
      map(exercises => {
        if (exercises.length === 0) {
          this.store.dispatch(new WorkoutActions.FetchAvailableExercises());
        }
      })
    );
  }
}
