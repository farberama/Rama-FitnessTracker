import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from 'src/app/shared/ui.service';
import * as fromTraining from './training.reducer';
import * as TrainingActions from './training.actions';
import * as UIActions from './../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchExercises() {
    this.store.dispatch(new UIActions.StartLoading());
    this.fbSubs.push(
      this.firestore
        .collection('compendium2')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            // TODO: figure out how to sort the query in firestore
            // then remove this sort function
            exercises.sort((a, b) => a.code - b.code);
            console.log(exercises);
            this.store.dispatch(
              new TrainingActions.SetAvalableExercises(exercises)
            );
            this.store.dispatch(new UIActions.StopLoading());
          },
          error => {
            this.store.dispatch(new UIActions.StopLoading());
            this.uiService.showSnackBar(
              'Could not retrieve exercises. Try again later.',
              'close',
              3000
            );
          }
        )
    );
  }

  startExercise(code: number) {
    this.store.dispatch(new TrainingActions.StartTraining(code));
  }

  completeExercise() {
    this.store.dispatch(new TrainingActions.SetTrainingCompleted());
    this.addExercisesToDB();
  }

  cancelExercise(progress: number) {
    this.store.dispatch(new TrainingActions.SetTrainingCanceled(progress));
    this.addExercisesToDB();
  }

  quitExercise() {
    this.store.dispatch(new TrainingActions.StopTraining());
  }

  fetchExerciseHistory() {
    this.fbSubs.push(
      this.firestore
        .collection('exerciseHistory')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new TrainingActions.SetExerciseHistory(exercises)
          );
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  // uploadCompendium() {
  //   this.compendium.forEach(exercise => {
  //     const ex = { ...exercise, code: +exercise.code, mets: +exercise.mets };
  //     this.firestore.collection('compendium2').add(ex);
  //   });
  // }

  private addExercisesToDB() {
    this.store
      .select(fromTraining.getCurrentExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.firestore.collection('exerciseHistory').add(ex);
      });
  }
}
