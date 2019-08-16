import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from '../../app.reducer';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
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

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
