import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  isAuth = false;
  constructor(private router: Router, private store: Store<fromApp.State>) {}

  // use take(1) operator because the guard only runs once.
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe(authData => {
        this.isAuth = authData.isAuthenticated;
      });
    if (this.isAuth) {
      console.log(this.isAuth, route.path);
      return true;
    } else {
      console.log(this.isAuth, route);
      this.router.navigate(['/login']);
    }
  }
}
