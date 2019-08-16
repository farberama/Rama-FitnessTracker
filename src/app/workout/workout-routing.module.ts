import { WorkoutHistoryComponent } from './workout-history/workout-history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutComponent } from './workout.component';
import { CurrentWorkoutComponent } from './current-workout/current-workout.component';
import { WorkoutDetailComponent } from './workout-list/workout-detail/workout-detail.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

// TODO: Add lazy loading
const routes: Routes = [
  {
    path: 'workouts',
    component: WorkoutComponent,
    children: [
      { path: 'my-workouts', component: WorkoutListComponent },
      { path: 'my-workout-history', component: WorkoutHistoryComponent },
      { path: 'add', component: WorkoutEditComponent },
      { path: ':id', component: CurrentWorkoutComponent },
      { path: 'details/:id', component: WorkoutDetailComponent },
      { path: 'edit/:id', component: WorkoutEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule {}
