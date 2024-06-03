import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreedDetails } from '../state/breeds/breed.model';
import { Store } from '@ngrx/store';
import { getBreedDetails } from '../state/breeds/breed.actions';
import { ActivatedRoute } from '@angular/router';
import { BreedState } from '../state/breeds/breed.model';
import { breedReducer } from '../state/breeds/breed.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details.component.html',
  standalone: true,
  imports: [AsyncPipe],
  styleUrls: ['./breed-details.component.scss'],
})
export class BreedDetailsComponent implements OnInit, OnDestroy {
  breedDetails$: Observable<BreedDetails> = this.store.select(
    breedReducer.selectSelectedBreed
  );
  private routeSubscription?: Subscription;

  constructor(
    private store: Store<BreedState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const breedName = params.get('breed');

      breedName ? this.store.dispatch(getBreedDetails({ breedName })) : null;
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
