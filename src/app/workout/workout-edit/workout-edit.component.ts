import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { WOExercise } from './../exercise.model';
import { Workout } from './../workout.model';
import * as fromApp from '../../app.reducer';
import * as UIActions from './../../shared/ui.actions';
import * as WorkoutActions from './../workout.actions';
import { CompExercise, Compendium } from '../compendium2';

import compendium from './../../../assets/data/compendium.json';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit, OnDestroy {
  compendium: Compendium[] = compendium.compExercises;
  isLoading$: Observable<boolean>;
  availableExercises: CompExercise[] = [];
  workout: Workout;
  woexercises: WOExercise[];
  id: string;
  editMode$: Observable<boolean>;
  subscription: Subscription;
  user: User;
  workoutForm: FormGroup;
  totalCalories = 0;
  totalDuration = 0;

  constructor(
    private store: Store<fromApp.State>,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.editMode$ = this.store.select(fromApp.getIsEditing);
    this.store.dispatch(new UIActions.StartLoading());
    this.user = this.authService.user;
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      if (this.id) {
        this.store.dispatch(new WorkoutActions.SetEditMode());
      } else {
        this.store.dispatch(new WorkoutActions.UnsetEditMode());
      }
    });

    this.compendium.forEach(comp => {
      comp.exercises.forEach(ex => {
        ex.category = comp.category;
        ex.mets = +ex.mets;
        this.availableExercises.push(ex);
      });
    });

    // TODO: figure out error handling for this observable
    // this.store
    //   .select(fromApp.getAvailableExercises)
    //   .pipe(
    //     switchMap(exercises => {
    //       console.log(exercises.length);
    //       if (exercises.length === 0) {
    //         this.store.dispatch(new WorkoutActions.FetchAvailableExercises());
    //         return this.store.select(fromApp.getAvailableExercises);
    //       } else {
    //         return of(exercises);
    //       }
    //     })
    //   )
    //   .subscribe(exercises => {
    //     console.log(exercises);
    //     this.availableExercises = exercises;
    //   });

    if (this.id) {
      this.subscription = this.store
        .select(fromApp.getCurrentWorkout)
        .subscribe(workout => {
          this.workout = workout;
          this.woexercises = workout.exercises;
          this.initForm();
          this.store.dispatch(new UIActions.StopLoading());
        });
    } else {
      this.workout = {
        name: ''
      };
      this.initForm();
      this.store.dispatch(new UIActions.StopLoading());
    }
  }

  initForm() {
    const woexercises = new FormArray([]);

    if (this.woexercises) {
      this.woexercises.forEach(exercise => {
        woexercises.push(
          new FormGroup({
            code: new FormControl(exercise.code, Validators.required),
            specificEx: new FormControl(exercise.specificEx),
            duration: new FormControl(exercise.duration, [
              Validators.required,
              Validators.pattern(/^\d+(\.\d+)?$/)
            ]),
            order: new FormControl(exercise.order, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      });
    }

    this.workoutForm = new FormGroup({
      name: new FormControl(this.workout.name, Validators.required),
      exercises: woexercises
    });

    this.totalDuration = this.workout.totalDuration
      ? this.workout.totalDuration
      : 0;
    this.totalCalories = this.workout.totalCalories
      ? this.workout.totalCalories
      : 0;
    this.onValueChanges();
  }

  onValueChanges() {
    (<FormArray>this.workoutForm.get('exercises')).valueChanges
      .pipe()
      .subscribe(() => {
        this.totalDuration = 0;
        this.totalCalories = 0;
        const calculateDuration = exercises => {
          exercises.forEach(exercise => {
            this.totalDuration += +exercise.duration;
            if (exercise.code > 0) {
              const thisEx = this.availableExercises.find(
                ex => ex.code === exercise.code
              );
              this.totalCalories += +(
                ((+thisEx.mets * 3.5 * this.user.weight) / 200) *
                exercise.duration
              ).toFixed(2);
            }
          });
          return this.totalDuration;
        };

        calculateDuration((<FormArray>this.workoutForm.get('exercises')).value);
      });
  }

  onRemoveExercise(index: number) {
    (<FormArray>this.workoutForm.get('exercises')).removeAt(index);
  }

  onAddExercise() {
    (this.workoutForm.get('exercises') as FormArray).push(
      new FormGroup({
        code: new FormControl(0, Validators.required),
        specificEx: new FormControl(),
        duration: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+(\.\d+)?$/)
        ]),
        order: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        id: new FormControl(null)
      })
    );
  }

  get exerciseControls() {
    return (<FormArray>this.workoutForm.get('exercises')).controls;
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['/workouts/details', this.workout.id]);
    } else {
      this.router.navigate(['/workouts']);
    }
  }

  onSubmit() {
    const woex = (<FormArray>this.workoutForm.get('exercises'))
      .value as WOExercise[];

    woex.forEach(exercise => {
      const thisEx = this.availableExercises.find(
        ex => ex.code === exercise.code
      );
      exercise.code = thisEx.code;
      exercise.category = thisEx.category;
      exercise.type = thisEx.type;
      exercise.mets = +thisEx.mets;
      exercise.duration = +exercise.duration;
    });

    this.workout.name = this.workoutForm.value.name;
    this.workout.totalCalories = +this.totalCalories.toFixed(2);
    this.workout.totalDuration = this.totalDuration;
    this.workout.exercises = [...woex];

    this.store.dispatch(
      new WorkoutActions.UpsertWorkout({ workout: this.workout })
    );
    this.store.dispatch(new WorkoutActions.UnsetEditMode());
    this.router.navigate(['/workouts/details', this.workout.id]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
