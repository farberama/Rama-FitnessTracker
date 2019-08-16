import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  currentTraining$: Observable<boolean>;

  // private trainingService: TrainingService ----- put in constructor when needed
  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.currentTraining$ = this.store.select(fromTraining.getIsTraining);
    //    this.trainingService.uploadCompendium();
  }
}
