import { Store } from '@ngrx/store';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { CancelTrainingComponent } from '../../workout/current-workout/cancel-training.component';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  exercise: Exercise;
  ready: number;
  countdown: any;
  timer: any;
  spinnerProgress: any;
  progress: number;
  minutesRemaining: number;
  secondsRemaining: number;
  totalMinutes: number;
  roundedTotalMinutes: number;
  totalSeconds: number;
  minutes = 0;
  seconds: number;
  paused = false;
  canceled = false;
  message: string;
  subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromTraining.getCurrentExercise)
      .pipe(take(1))
      .subscribe(exercise => {
        this.exercise = exercise;
      });

    this.totalMinutes = this.exercise.duration;
    this.totalSeconds = this.totalMinutes * 60;
    this.setExercise();
  }

  setExercise() {
    this.progress = 0;
    this.message = '';
    this.minutes = 0;
    this.seconds =
      this.totalSeconds % 60 > 0 ? 60 - (this.totalSeconds % 60) : 0;
    this.secondsRemaining = this.totalSeconds % 60;
    // TODO: roundedTotalMinutes is used to display timer minutes
    // TODO: will eventually create a pipe to round down all minutes for display
    this.roundedTotalMinutes = Math.floor(this.totalMinutes);
    if (this.roundedTotalMinutes < 1) {
      this.minutesRemaining = 0;
    } else {
      this.minutesRemaining = this.roundedTotalMinutes;
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
        this.minutesRemaining = this.roundedTotalMinutes - this.minutes;
        this.secondsRemaining = 60 - (this.seconds % 60);
        console.log(this.progress);
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
    this.trainingService.completeExercise();
  }

  onCancel() {
    this.stopExercise();
    const dialogRef = this.dialog.open(CancelTrainingComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
        this.message = 'Program Canceled';
        this.progress = 100;
      } else {
        this.getReady();
        this.message = '';
      }
    });
  }

  onExitTraining() {
    this.trainingService.quitExercise();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
