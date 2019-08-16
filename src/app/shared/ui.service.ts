import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  snackBarRef: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string, duration = null) {
    if (duration) {
      this.snackBarRef = this.snackBar.open(message, action, {
        duration: duration
      });
    } else {
      this.snackBarRef = this.snackBar.open(message, action);
    }
  }

  dismissSnackBar() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
}
