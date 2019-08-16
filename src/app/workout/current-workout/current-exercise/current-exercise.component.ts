import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { Workout } from '../../workout.model';
import { WorkoutService } from '../../workout.service';
import { CancelTrainingComponent } from '../cancel-training.component';
import { WOExercise } from '../../exercise.model';
import * as fromApp from '../../../app.reducer';
import * as WorkoutActions from './../../workout.actions';

@Component({
  selector: 'app-current-exercise',
  templateUrl: './current-exercise.component.html',
  styleUrls: ['./current-exercise.component.css']
})
export class CurrentExerciseComponent implements OnInit, OnDestroy {
  activeWorkout: Workout;
  woexercises: WOExercise[];
  currentExercise: WOExercise;
  ready: number;
  countdown: any;
  timer: any;
  spinnerProgress: any;
  progress: number;
  minutesRemaining: number;
  secondsRemaining: number;
  totalMinutes: number;
  totalSeconds: number;
  minutes = 0;
  seconds: number;
  paused = false;
  canceled = false;
  message: string;
  subscription: Subscription;
  exChangedSub: Subscription;
  woSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private workoutService: WorkoutService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromApp.getActiveExercise)
      .subscribe(exercise => {
        if (exercise) {
          console.log(exercise);
          this.currentExercise = exercise;
          this.totalMinutes = this.currentExercise.duration;
          this.totalSeconds = this.totalMinutes * 60;
          this.setExercise();
        } else {
          this.completeWorkout();
        }
      });
  }

  setExercise() {
    this.progress = 0;
    this.message = '';
    this.minutes = 0;
    this.seconds =
      this.totalSeconds % 60 > 0 ? 60 - (this.totalSeconds % 60) : 0;
    this.secondsRemaining = this.totalSeconds % 60;
    this.totalMinutes = Math.floor(this.totalMinutes);
    if (this.totalMinutes < 1) {
      this.minutesRemaining = 0;
    } else {
      this.minutesRemaining = this.totalMinutes;
    }
    this.getReady();
  }

  getReady() {
    this.ready = 1;
    this.countdown = setInterval(() => {
      if (this.ready > 0) {
        this.ready--;
      } else {
        clearInterval(this.countdown);
        this.startExercise();
      }
    }, 1000);
  }

  startExercise() {
    console.log('progress', this.progress);
    const step = this.totalSeconds;
    // for remaining time clock
    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        this.stopExercise();
        this.completeExercise();
      } else {
        this.seconds++;
        if (
          (this.seconds % 60 === 0 || this.seconds === 1) &&
          this.minutesRemaining > 0
        ) {
          this.minutes++;
        }
        this.minutesRemaining = this.totalMinutes - this.minutes;
        this.secondsRemaining = 60 - (this.seconds % 60);
      }
    }, 1000);

    // for progress spinner
    this.spinnerProgress = setInterval(() => {
      this.progress = this.progress + 0.1;
    }, step);
  }

  stopExercise() {
    clearInterval(this.timer);
    clearInterval(this.spinnerProgress);
  }

  onPause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.stopExercise();
      this.message = '(paused)';
    } else {
      this.getReady();
      this.message = '';
    }
  }

  completeExercise() {
    this.message = 'Program complete. Great job!';
    this.store.dispatch(new WorkoutActions.UpdateActiveWorkout(1));
  }

  cancelWorkout(progress: number) {
    this.store.dispatch(new WorkoutActions.UpdateActiveWorkout(progress / 100));
    this.store.dispatch(new WorkoutActions.SetWorkoutCanceled());
  }

  completeWorkout() {
    this.store.dispatch(new WorkoutActions.SetWorkoutCompleted());
    this.store.dispatch(new WorkoutActions.CompleteWorkout());
  }

  onCancelWO() {
    this.stopExercise();
    const dialogRef = this.dialog.open(CancelTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelWorkout(this.progress);
        this.message = 'Workout Canceled';
        this.progress = 100;
      } else {
        this.getReady();
        this.message = '';
      }
    });
  }

  onExitWorkout() {
    this.workoutService.quitWorkout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.woSub) {
      this.woSub.unsubscribe();
    }
  }
}
