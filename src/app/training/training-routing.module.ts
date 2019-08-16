import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';

// removed AuthGuard from this routing module and added it to the
// app-routing module using canLoad instead of canActivate. This
// will keep the application from loading the training module even
// when the user cannot visit the page.
const routes: Routes = [{ path: 'training', component: TrainingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
