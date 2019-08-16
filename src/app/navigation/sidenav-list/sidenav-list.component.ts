import { User } from './../../auth/user.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './../../auth/auth.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isExpanded = false;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
    this.user$ = this.store.select(fromApp.getUser);
  }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSidenav();
    this.router.navigate(['/']);
  }
}
