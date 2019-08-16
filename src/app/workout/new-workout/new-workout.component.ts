import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { User } from '../../auth/user.model';
import { Workout } from '../workout.model';
import { WorkoutService } from './../workout.service';
import { Exercise } from 'src/app/training/exercise.model';
import * as fromApp from '../../app.reducer';
import * as UIActions from './../../shared/ui.actions';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  workoutName: string;
  workoutExercises: Exercise[];
  workout: Workout;
  isLoading$: Observable<boolean>;
  workoutForm: FormGroup;
  user: User;

  constructor(
    private store: Store<fromApp.State>,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    // this.store.dispatch(new UIActions.StartLoading());
    // this.store.select(fromApp.getAvailableExercises).subscribe(exercises => {
    //   this.availableExercises = exercises;
    //   console.log('exercises', exercises);
    //   this.store.dispatch(new UIActions.StopLoading());
    // });
    this.store.select(fromApp.getUser).subscribe(user => (this.user = user));
    this.initForm();
  }

  private initForm() {
    const workoutName = '';
    const woexercises = new FormArray([]);

    // if (this.store.select(fromApp.getIsEditing)) {
    //   // workoutName = this.store.select(fromApp)
    //   workoutName = 'workout';
    //   woexercises.push(new FormGroup({}));
    // }

    this.workoutForm = new FormGroup({
      name: new FormControl(workoutName, Validators.required),
      exercises: woexercises
    });
  }

  onAddExercise() {
    (<FormArray>this.workoutForm.get('exercises')).push(
      new FormGroup({
        exercise: new FormControl(null, Validators.required),
        duration: new FormControl(null, Validators.required)
      })
    );
  }

  onRemoveExercise(index: number) {
    (<FormArray>this.workoutForm.get('exercises')).removeAt(index);
  }

  get exerciseControls() {
    return (this.workoutForm.get('exercises') as FormArray).controls;
  }

  onSubmit() {}
}
