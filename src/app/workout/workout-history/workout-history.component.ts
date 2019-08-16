import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { WorkoutService } from './../workout.service';
import { Workout } from '../workout.model';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-workout-history',
  templateUrl: './workout-history.component.html',
  styleUrls: ['./workout-history.component.css']
})
export class WorkoutHistoryComponent
  implements OnInit, AfterViewInit, OnDestroy {
  history: Workout[];
  subscription: Subscription;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  // MatTableDataSource assumes an array to be passed, so no need to define it
  dataSource = new MatTableDataSource<Workout>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private store: Store<fromApp.State>,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.subscription = this.workoutService.history$.subscribe(
      history => (this.dataSource.data = history)
    );
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
