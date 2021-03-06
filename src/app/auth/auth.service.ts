import { AngularFirestore } from '@angular/fire/firestore';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { WorkoutService } from './../workout/workout.service';
import { UIService } from '../shared/ui.service';
import * as fromApp from '../app.reducer';
import * as UIActions from '../shared/ui.actions';
import * as AuthActions from './auth.actions';
import * as WorkoutActions from './../workout/workout.actions';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: Observable<User>;
  user: User = {
    uid: null,
    email: null,
    displayName: null,
    weight: null
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private uiService: UIService,
    private workoutService: WorkoutService,
    private store: Store<fromApp.State>,
    private firestore: AngularFirestore
  ) {
    // this.user = this.fireAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.firestore.doc<User>(`users${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // )
  }

  initAuthListener() {
    this.fireAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            this.user.uid = user.uid;
            this.user.email = user.email;
            return this.firestore.doc(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
      .subscribe(user => {
        if (user) {
          this.user.displayName = user.displayName;
          this.user.weight = user.weight;
          this.store.dispatch(new AuthActions.SetAuthenticated(this.user));
          this.store.dispatch(
            new WorkoutActions.SetUserWeight(this.user.weight)
          );
          this.router.navigate(['/']);
        } else {
          this.store.dispatch(new AuthActions.SetUnauthenticated());
          this.workoutService.cancelSubscriptions();
        }
      });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        return this.firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            displayName: authData.displayName,
            weight: authData.weight
          });
      })
      .then(() => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.dismissSnackBar();
      })
      .catch(err => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(err.message, 'close');
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.dismissSnackBar();
      })
      .catch(err => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(err.message, 'close');
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
  }
}
