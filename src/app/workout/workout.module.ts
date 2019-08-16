import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { CancelWorkoutComponent } from './current-workout/cancel-workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutRoutingModule } from './workout-routing.module';
import { CurrentWorkoutComponent } from './current-workout/current-workout.component';
import { WorkoutComponent } from './workout.component';
import { WorkoutHistoryComponent } from './workout-history/workout-history.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { WorkoutItemComponent } from './workout-list/workout-item/workout-item.component';
import { WorkoutDetailComponent } from './workout-list/workout-detail/workout-detail.component';
import { CurrentExerciseComponent } from './current-workout/current-exercise/current-exercise.component';
import { WorkoutCompleteComponent } from './current-workout/workout-complete/workout-complete.component';
// import { workoutReducer } from './workout.reducer';

@NgModule({
  declarations: [
    WorkoutComponent,
    CurrentWorkoutComponent,
    NewWorkoutComponent,
    WorkoutHistoryComponent,
    CancelWorkoutComponent,
    WorkoutListComponent,
    WorkoutEditComponent,
    WorkoutItemComponent,
    WorkoutDetailComponent,
    CurrentExerciseComponent,
    WorkoutCompleteComponent
  ],
  imports: [
    SharedModule,
    WorkoutRoutingModule
    // StoreModule.forFeature('workout', workoutReducer)
  ],
  entryComponents: [CancelWorkoutComponent]
})
export class WorkoutModule {}
